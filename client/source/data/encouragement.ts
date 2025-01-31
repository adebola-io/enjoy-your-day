import { Cell } from '@adbl/cells';
import {
  dailyGoals,
  goalsCompleted,
  liveDate,
  numberOfScheduledGoals,
  timeOfDay,
} from './state';
import { selectAtRandom } from '#/library/utils';
export const encouragement = Cell.derived(() => {
  const count = numberOfScheduledGoals.value;
  const goalsPhrase = count === 1 ? `${count} goal` : `${count} goals`;

  const hours = liveDate.value.getHours();
  if (hours >= 20 && count > 4) {
    return `It's getting late, but its not over yet. You have ${goalsPhrase} left. I believe in you!`;
  }

  if (count <= 4 && count && count <= dailyGoals.value.length - 3) {
    return `Almost there! You have just ${goalsPhrase} left for today. Stay motivated, you can do it!`;
  }

  if (count >= 15 && timeOfDay.value === 'morning') {
    return `There is a lot to do today! Keep pushing forward and you'll reach your goals.`;
  }

  if (goalsCompleted.value) {
    return selectAtRandom([
      'Your goals are done! Take a moment: sit back, relax and enjoy your achievements.',
      'You did it! All your goals are completed. Congratulations!',
      'You have no goals left for today. Enjoy your free time!',
    ]);
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
