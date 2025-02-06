import type { GoalState, GoalStateSerialized } from '#/data/entities';
import { Cell, type SourceCell } from '@adbl/cells';
import { GoalItem } from '../goal-item';
import { vibrate } from '#/library/utils';
import classes from './goal-checklist-item.module.css';
import { Temporal } from 'temporal-polyfill';

export interface GoalChecklistItemProps {
  goalState: GoalState | GoalStateSerialized;
  index: Cell<number>;
  listChanged: SourceCell<boolean>;
  onCheck?: () => void;
}

export function GoalChecklistItem(props: GoalChecklistItemProps) {
  const { goalState, index, listChanged, onCheck } = props;
  const containerStyles = { '--i': index };
  const initialCheckState = goalState.state === 'completed';
  const goalInputId = Cell.derived(() => `goal-checklist-${index.value}`);
  const changeGoalState = function (this: HTMLInputElement) {
    vibrate(10);
    listChanged.value = true;
    goalState.state = this.checked ? 'completed' : 'scheduled'; // dailyGoals array is already deeply reactive.
    if (this.checked) {
      onCheck?.();
      goalState.updatedAt = Temporal.Now.plainDateTimeISO().toString();
    } else {
      goalState.updatedAt = null;
    }
  };

  return (
    <div class={classes.container} style={containerStyles}>
      <input
        id={goalInputId}
        class={classes.checkbox}
        type="checkbox"
        checked={initialCheckState}
        onChange={changeGoalState}
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
