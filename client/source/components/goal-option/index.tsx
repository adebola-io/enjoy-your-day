import { IconName } from '#/library/icon-name';
import classes from './goal-option.module.css';

export interface GoalOptionProps {
  instruction: string;
  icon: IconName;
}

export function GoalOption(props: GoalOptionProps) {
  return (
    <li class={classes.container}>
      <button class={classes.option}>{props.instruction}</button>
    </li>
  );
}
