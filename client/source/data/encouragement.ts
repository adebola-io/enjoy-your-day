import { Cell } from '@adbl/cells';
import {
  dailyGoals,
  goalsCompleted,
  numberOfScheduledGoals,
  timeOfDay,
} from './state';

export const encouragement = Cell.derived(() => {
  const count = numberOfScheduledGoals.value;
  const goalsPhrase = count === 1 ? `${count} goal` : `${count} goals`;

  if (
    numberOfScheduledGoals.value <= 4 &&
    numberOfScheduledGoals.value <= dailyGoals.value.length - 3 &&
    numberOfScheduledGoals.value !== 0
  ) {
    return `Almost there! You have just ${goalsPhrase} left for today. Stay motivated, you can do it!`;
  }

  if (numberOfScheduledGoals.value >= 15 && timeOfDay.value === 'morning') {
    return `There is a lot to do today! Keep pushing forward and you'll reach your goals.`;
  }

  if (goalsCompleted.value) {
    return 'Your goals are done! Take a moment: sit back, relax and enjoy your achievements.';
  }

  if (timeOfDay.value === 'morning') {
    return `The day looks promising! You have ${goalsPhrase} left. Stay focused and keep pushing forward.`;
  }

  if (timeOfDay.value === 'afternoon') {
    return `How's it going? You have ${goalsPhrase} left. Every step brings you closer to a joyous day. Good luck!`;
  }

  if (timeOfDay.value === 'evening') {
    return `The day is almost over, but you still have some work to do. ${goalsPhrase} left!`;
  }

  return 'Good day!';
});
