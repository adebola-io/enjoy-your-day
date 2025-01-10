import { Temporal } from 'temporal-polyfill';

export const cardDescriptionGenerator = {
  completed: (value: number, startDate: string) => {
    if (value === 0)
      return 'You have not completed any goals. Get started, your journey awaits!';
    const noun = value === 1 ? 'goal' : 'goals';
    return `Since you started using this app on ${startDate}, you have completed ${value} ${noun}.`;
  },

  committed: (value: number, startDate: string) => {
    if (value === 0) return 'You have not committed to any goals yet.';
    const noun = value === 1 ? 'goal' : 'goals';
    return `Since you started using this app on ${startDate}, you have committed to ${value} ${noun}.`;
  },

  longestStreak: (start?: string, end?: string) => {
    if (!start || !end) return 'You do not have a streak yet.';

    const startDate = Temporal.PlainDate.from(start);
    const endDate = Temporal.PlainDate.from(end);
    const diff = startDate.until(endDate, { largestUnit: 'days' });

    if (diff.days === 0) return 'You do not have a longest streak yet.';

    const startDateString = startDate.toLocaleString('en-US', {
      dateStyle: 'long',
    });
    const endDateString = endDate.toLocaleString('en-US', {
      dateStyle: 'long',
    });

    return `Your longest streak is ${diff.days} days, from ${startDateString} to ${endDateString}.`;
  },

  dailyCompletionRate(rate: number) {
    if (rate === 0) {
      return 'You have not completed any tasks.';
    }

    if (rate < 20) {
      return 'Your daily completion rate is not the best, but it can be better!';
    }

    if (rate < 40) {
      return 'Your daily completion rate is okay, but it can be better!';
    }

    if (rate < 60) {
      return 'Your daily completion rate is above average.';
    }

    return 'Your daily completion rate is top tier, and you are doing great!';
  },

  unfinishedGoals(unfinishedGoals: number, startDate: string) {
    if (unfinishedGoals === 0) {
      return 'You have no unfinished goals.';
    }

    return `You have ${unfinishedGoals} unfinished goals since you started using this app on ${startDate}.`;
  },
};
