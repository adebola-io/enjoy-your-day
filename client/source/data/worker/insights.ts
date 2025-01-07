import { cardDescriptionGenerator as cardDesc } from './card-description';
import { dexie } from './dexie';
import type { WorkerProtocol } from './types';

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
      name: 'New Kid.',
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
  data;
  return {
    maxChartValue: 15,
    chartData: [
      {
        date: new Date('2025-01-01').toISOString(),
        value: { completed: 2, total: 2 },
        categoryProfile: ['Cooking', 'Arts', 'Social Connection'],
      },
      {
        date: new Date('2025-01-01').toISOString(),
        value: { completed: 2, total: 2 },
        categoryProfile: ['Cooking', 'Arts', 'Social Connection'],
      },
      {
        date: new Date('2025-01-01').toISOString(),
        value: { completed: 2, total: 2 },
        categoryProfile: ['Cooking', 'Arts', 'Social Connection'],
      },
      {
        date: new Date('2025-01-01').toISOString(),
        value: { completed: 2, total: 2 },
        categoryProfile: ['Cooking', 'Arts', 'Social Connection'],
      },
      {
        date: new Date('2025-01-02').toISOString(),
        value: { completed: 10, total: 12 },
        categoryProfile: ['Cooking', 'Arts', 'Social Connection'],
      },
      {
        date: new Date('2025-01-03').toISOString(),
        value: { completed: 10, total: 12 },
        categoryProfile: ['Cooking', 'Arts', 'Social Connection'],
      },
      {
        date: new Date('2025-01-04').toISOString(),
        value: { completed: 8, total: 15 },
        categoryProfile: ['Cooking', 'Arts', 'Social Connection'],
      },
      {
        date: new Date('2025-01-05').toISOString(),
        value: { completed: 8, total: 10 },
        categoryProfile: ['Cooking', 'Arts', 'Social Connection'],
      },
      {
        date: new Date().toISOString(),
        value: { completed: 10, total: 10 },
        categoryProfile: ['Cooking', 'Arts', 'Social Connection'],
      },
    ],
  };
};
