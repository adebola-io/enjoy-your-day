import { Temporal } from 'temporal-polyfill';
import { cardDescriptionGenerator as cardDesc } from './card-description';
import { dexie } from './dexie';
import type { HistoryChartItem, WorkerProtocol } from './types';
import type { GoalState } from '../entities';

type InsightsOverviewHandler =
  WorkerProtocol.Handler<WorkerProtocol.Requests.GetInsightsOverview>;
type InsightsHistoryHandler =
  WorkerProtocol.Handler<WorkerProtocol.Requests.GetInsightsHistory>;

export const insightsOverview: InsightsOverviewHandler = async (data) => {
  const { todaysData } = data.message;
  const previousRecords = await dexie.history.orderBy('date').toArray();
  let totalGoalsCompleted = 0;
  let totalGoalsCommittedTo = 0;
  let longestDailyStreak = 0;
  let unfinishedGoals = 0;

  const users = await dexie.userMetadata.toArray();
  const user = users[0];
  const startDate = new Date(user.startDate).toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  for (const record of previousRecords) {
    let completedDaily = 0;
    let totalDaily = 0;
    for (const goalState of record.goalStates) {
      totalDaily++;
      if (goalState.state === 'completed') completedDaily++;
      else unfinishedGoals++;
    }
    if (completedDaily === totalDaily) longestDailyStreak++;
    else longestDailyStreak = 0;
    totalGoalsCommittedTo += totalDaily;
    totalGoalsCompleted += completedDaily;
  }

  for (const goalState of todaysData) {
    totalGoalsCommittedTo++;
    if (goalState.state === 'completed') totalGoalsCompleted++;
  }

  return {
    userBadge: {
      icon: 'cookie',
      name: 'New Kid',
      description:
        "You recently started your journey on this app. It's great to have you on board!",
    },
    cards: [
      {
        name: 'Total Completed',
        value: totalGoalsCompleted,
        suffix: totalGoalsCompleted === 1 ? 'goal' : 'goals',
        icon: 'bar-chart',
        color: '#013c3b',
        description: cardDesc.completed(totalGoalsCompleted, startDate),
      },
      {
        name: 'Committed To',
        value: totalGoalsCommittedTo,
        suffix: totalGoalsCommittedTo === 1 ? 'goal' : 'goals',
        icon: 'anchor',
        color: '#05688f',
        description: cardDesc.committed(totalGoalsCommittedTo, startDate),
      },
      {
        name: 'Longest Streak',
        value: String(longestDailyStreak),
        suffix: longestDailyStreak === 1 ? 'day' : 'days',
        icon: 'trophy',
        color: '#2d0a62',
        description:
          "You recently started your journey on this app. It's great to have you on board!",
      },
      {
        name: 'Average Completion Rate',
        value: '30',
        suffix: '%',
        icon: 'calendar',
        color: '#253a54',
        description:
          "You recently started your journey on this app. It's great to have you on board!",
      },
      {
        name: 'Unfinished Goals',
        value: unfinishedGoals,
        suffix: unfinishedGoals === 1 ? 'goal' : 'goals',
        icon: 'stack',
        color: '#b93200',
        description:
          "You recently started your journey on this app. It's great to have you on board!",
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
