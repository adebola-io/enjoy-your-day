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
};
