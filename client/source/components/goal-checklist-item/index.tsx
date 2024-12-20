import type { GoalState } from '#/data/entities';
import type { Cell } from '@adbl/cells';
import { GoalItem } from '../goal-item';
import classes from './goal-checklist-item.module.css';

export interface GoalChecklistItemProps {
  goalState: GoalState;
  index: Cell<number>;
}

export function GoalChecklistItem(props: GoalChecklistItemProps) {
  return (
    <div class={classes.container}>
      <input class={classes.checkbox} type="checkbox" />
      <GoalItem {...props.goalState.goal} cancelable={false} />
    </div>
  );
}
