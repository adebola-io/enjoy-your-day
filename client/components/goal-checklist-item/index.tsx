import type { GoalState, GoalStateSerialized } from '#/data/entities';
import { Cell } from '@adbl/cells';
import { GoalItem } from '../goal-item';
import { vibrate } from '#/library/utils';
import classes from './goal-checklist-item.module.css';
import { Temporal } from 'temporal-polyfill';

export interface GoalChecklistItemProps {
  goalState: GoalState | GoalStateSerialized;
  index: Cell<number>;
  onCheck?: () => void;
}

export function GoalChecklistItem(props: GoalChecklistItemProps) {
  const { goalState, index, onCheck } = props;
  const initialCheckState = goalState.state === 'completed';
  const disabled = Cell.derived(() => goalState.state === 'forfeited');
  const goalInputId = Cell.derived(() => `goal-checklist-${index.value}`);
  const goalUUid = Cell.derived(() => goalState.goal.uuid);

  const changeGoalState = function (this: HTMLInputElement) {
    vibrate(10);
    goalState.state = this.checked ? 'completed' : 'scheduled'; // dailyGoals array is already deeply reactive.
    if (this.checked) {
      onCheck?.();
      goalState.updatedAt = Temporal.Now.plainDateTimeISO().toString();
    } else {
      goalState.updatedAt = null;
    }
  };

  return (
    <div
      data-goal-uuid={goalUUid}
      class={classes.container}
      data-forfeited={disabled}
    >
      <input
        id={goalInputId}
        class={classes.checkbox}
        type="checkbox"
        checked={initialCheckState}
        onChange={changeGoalState}
        disabled={disabled}
      />
      <GoalItem
        {...goalState.goal}
        cancelable={false}
        listItem={false}
        labelFor={goalInputId}
      />
    </div>
  );
}
