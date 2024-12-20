import type { GoalState } from '#/data/entities';
import type { Cell, SourceCell } from '@adbl/cells';
import { GoalItem } from '../goal-item';
import classes from './goal-checklist-item.module.css';

export interface GoalChecklistItemProps {
  goalState: GoalState;
  index: Cell<number>;
  listChanged: SourceCell<boolean>;
}

export function GoalChecklistItem(props: GoalChecklistItemProps) {
  const { goalState, index, listChanged } = props;
  const containerStyles = { '--i': index };
  const initialCheckState = goalState.state === 'completed';
  const changeGoalState = function (this: HTMLInputElement) {
    listChanged.value = true;
    goalState.state = this.checked ? 'completed' : 'scheduled'; // dailyGoals array is already deeply reactive.
  };
  const removeInitialAnimation = function (this: HTMLDivElement) {
    this.style.animation =
      'var(--fade-in-from-top) calc(var(--default-duration) * 3 * var(--list-changed))';
  };

  return (
    <div
      class={classes.container}
      style={containerStyles}
      onAnimationEnd--self={removeInitialAnimation}
    >
      <input
        class={classes.checkbox}
        type="checkbox"
        checked={initialCheckState}
        onChange={changeGoalState}
      />
      <GoalItem {...props.goalState.goal} cancelable={false} />
    </div>
  );
}
