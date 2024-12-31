import type { GoalState } from '#/data/entities';
import { Cell, type SourceCell } from '@adbl/cells';
import { GoalItem } from '../goal-item';
import { vibrate } from '#/library/utils';
import classes from './goal-checklist-item.module.css';
import { Temporal } from 'temporal-polyfill';

export interface GoalChecklistItemProps {
  goalState: GoalState;
  index: Cell<number>;
  listChanged: SourceCell<boolean>;
  onCheck?: () => void;
}

export function GoalChecklistItem(props: GoalChecklistItemProps) {
  const { goalState, index, listChanged } = props;
  const containerStyles = { '--i': index };
  const initialCheckState = goalState.state === 'completed';
  const goalInputId = Cell.derived(() => `goal-checklist-${index.value}`);
  const changeGoalState = function (this: HTMLInputElement) {
    vibrate(10);
    listChanged.value = true;
    goalState.state = this.checked ? 'completed' : 'scheduled'; // dailyGoals array is already deeply reactive.
    if (this.checked) {
      props.onCheck?.();
      goalState.updatedAt = Temporal.Now.plainDateISO().toString();
    } else {
      goalState.updatedAt = null;
    }
  };
  const removeInitialAnimation = function (this: HTMLDivElement) {
    this.style.animation =
      'from-top calc(var(--default-duration) * 3 * var(--list-changed))';
  };

  return (
    <div
      class={classes.container}
      style={containerStyles}
      onAnimationEnd--self={removeInitialAnimation}
    >
      <input
        id={goalInputId}
        class={classes.checkbox}
        type="checkbox"
        checked={initialCheckState}
        onChange={changeGoalState}
      />
      <GoalItem
        {...props.goalState.goal}
        cancelable={false}
        listItem={false}
        labelFor={goalInputId}
      />
    </div>
  );
}
