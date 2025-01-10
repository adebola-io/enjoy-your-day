import { Temporal } from 'temporal-polyfill';
import { cardDescriptionGenerator as cardDesc } from './card-description';
import { dexie } from './dexie';
import type {
  HistoryChartItem,
  InsightsOverview,
  WorkerProtocol,
} from './types';
import type { GoalState } from '../entities';

type InsightsOverviewHandler =
  WorkerProtocol.Handler<WorkerProtocol.Requests.GetInsightsOverview>;
type InsightsHistoryHandler =
  WorkerProtocol.Handler<WorkerProtocol.Requests.GetInsightsHistory>;

function isDayBefore(previous: string, next: string) {
  return Temporal.PlainDate.from(previous).equals(
    Temporal.PlainDate.from(next).subtract({ days: 1 })
  );
}

export const insightsOverview: InsightsOverviewHandler = async (data) => {
  const { todaysData } = data.message;
  const previousRecords = await dexie.history.orderBy('date').toArray();
  let completedInMornings = 0;
  let completedInEvenings = 0;
  let totalGoalsCompleted = 0;
  let totalGoalsCommittedTo = 0;

  let streakCounter = 0;
  let longestStreak = 0;
  let longestStreakStart: string | undefined = undefined;
  let longestStreakEnd: string | undefined = undefined;

  let unfinishedGoals = 0;
  let dailyCompletionRate = 0;

  const users = await dexie.userMetadata.toArray();
  const user = users[0];
  const startDate = Temporal.ZonedDateTime.from(user.startDate);
  const startDateStr = startDate.toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const today = Temporal.Now.zonedDateTimeISO();
  const timeSinceStart = today.since(startDate, { largestUnit: 'days' });

  let i = 0;
  while (previousRecords[i]) {
    const record = previousRecords[i];
    const previous = previousRecords[i - 1];
    if (!isDayBefore(previous.date, record.date)) {
      streakCounter = 0;
    }

    let completedOnDay = 0;
    let totalOnDay = 0;

    for (const goalState of record.goalStates) {
      totalOnDay++;

      if (goalState.state !== 'completed') {
        unfinishedGoals++;
        continue;
      }

      completedOnDay++;

      if (!goalState.updatedAt) continue;

      const time = Temporal.PlainDateTime.from(goalState.updatedAt);
      if (time.hour >= 17) completedInEvenings++;
      else if (time.hour >= 12) completedInMornings++;
    }
    totalGoalsCommittedTo += totalOnDay;
    totalGoalsCompleted += completedOnDay;

    if (completedOnDay === totalOnDay) {
      if (streakCounter === 0) {
        longestStreakStart = record.date;
      }
      streakCounter++;
      longestStreakEnd = record.date;
    } else {
      streakCounter = 0;
    }

    dailyCompletionRate =
      (Math.round((completedOnDay / totalOnDay) * 100) + dailyCompletionRate) /
      2;

    i++;
  }

  for (const goalState of todaysData) {
    totalGoalsCommittedTo++;
    if (goalState.state === 'completed') totalGoalsCompleted++;
  }

  let userBadge: InsightsOverview['userBadge'];
  switch (true) {
    case timeSinceStart.days <= 3:
      userBadge = {
        icon: 'cookie',
        name: 'New Kid.',
        description:
          "You recently started your journey on this app. It's great to have you on board!",
      };
      break;
    case timeSinceStart.days >= 7 && totalGoalsCommittedTo <= 15:
      userBadge = {
        icon: 'two-leaves',
        name: 'Observer.',
        description:
          "You've spent some time on this app, but you are still cautious and careful. I respect that!",
      };
      break;
    case totalGoalsCompleted < totalGoalsCommittedTo / 2:
      userBadge = {
        icon: 'bed',
        name: 'Dreamer.',
        description:
          'You tend to commit to a lot more than you can complete. Try to go easy on yourself!',
      };
      break;
    case totalGoalsCompleted < totalGoalsCommittedTo / 5:
      userBadge = {
        icon: 'sloth',
        name: 'Slow and Steady.',
        description:
          "You're not very good at completing your goals. I'm sure you'll get better with time!",
      };
      break;
    case completedInMornings > totalGoalsCommittedTo / 1.5:
      userBadge = {
        icon: 'bird',
        name: 'Early Bird.',
        description:
          'You are very good at starting your day with completed goals. Keep it up!',
      };
      break;
    case completedInEvenings > totalGoalsCommittedTo / 1.5:
      userBadge = {
        icon: 'owl',
        name: 'Night Owl.',
        description:
          'You seem to complete most goals in the evenings and at nighttime. Love that for you!',
      };
      break;
    case dailyCompletionRate > 75:
      userBadge = {
        icon: 'spartan-helmet',
        name: 'Titan.',
        description: 'You have a very high daily completion rate. Well done!',
      };
      break;
    case totalGoalsCommittedTo > 200 && dailyCompletionRate > 90:
      userBadge = {
        icon: 'medal',
        name: 'OverAchiever.',
        description:
          'Many goals committed, many goals completed. You are a master!',
      };
      break;
    default:
      userBadge = {
        icon: 'ace-of-spades',
        name: 'The Infinite',
        description:
          'The coin has not quite landed. Keep using the app and find out!',
      };
      break;
  }

  return {
    userBadge,
    cards: [
      {
        name: 'Total Completed',
        value: totalGoalsCompleted,
        suffix: totalGoalsCompleted === 1 ? 'goal' : 'goals',
        icon: 'bar-chart',
        color: '#013c3b',
        description: cardDesc.completed(totalGoalsCompleted, startDateStr),
      },
      {
        name: 'Committed To',
        value: totalGoalsCommittedTo,
        suffix: totalGoalsCommittedTo === 1 ? 'goal' : 'goals',
        icon: 'anchor',
        color: '#05688f',
        description: cardDesc.committed(totalGoalsCommittedTo, startDateStr),
      },
      {
        name: 'Longest Streak',
        value: String(longestStreak),
        suffix: longestStreak === 1 ? 'day' : 'days',
        icon: 'trophy',
        color: '#2d0a62',
        description: cardDesc.longestStreak(
          longestStreakStart,
          longestStreakEnd
        ),
      },
      {
        name: 'Average Completion Rate',
        value: dailyCompletionRate,
        suffix: '%',
        icon: 'calendar',
        color: '#253a54',
        description: cardDesc.dailyCompletionRate(dailyCompletionRate),
      },
      {
        name: 'Unfinished Goals',
        value: unfinishedGoals,
        suffix: unfinishedGoals === 1 ? 'goal' : 'goals',
        icon: 'stack',
        color: '#b93200',
        description: cardDesc.unfinishedGoals(unfinishedGoals, startDateStr),
      },
    ],
  };
};

export const insightsHistory: InsightsHistoryHandler = async (data) => {
  const { start, end } = data.message;
  let nextDate = Temporal.PlainDate.from(end);
  const startDate = Temporal.PlainDate.from(start);

  const chartData: HistoryChartItem[] = [];
  let maxChartValue = 1;
  while (Temporal.PlainDate.compare(nextDate, startDate) >= 1) {
    const date = nextDate.toString();
    const records = await dexie.history.where('date').equals(date).toArray();

    // No record for the day.
    if (records.length === 0) {
      chartData.push({
        date,
        total: 0,
        categories: [],
        completed: [],
        unfinished: [],
      });
      nextDate = nextDate.subtract({ days: 1 });
      continue;
    }

    const data = records[0];
    const goalStates = data.goalStates;
    const completed: GoalState[] = [];
    const unfinished: GoalState[] = [];
    const total = goalStates.length;
    maxChartValue = Math.max(maxChartValue, goalStates.length);
    const categories = ['Arts'];

    for (const goalState of goalStates) {
      if (goalState.state === 'completed') completed.push(goalState);
      else unfinished.push(goalState);
    }

    chartData.push({ date, total, categories, completed, unfinished });
    nextDate = nextDate.subtract({ days: 1 });
  }
  return { maxChartValue, chartData };
};
