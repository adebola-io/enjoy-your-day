import { IconName } from '#/library/icon-name';
import { Icon } from '#/components/icon';
import classes from './goal-option.module.css';

export interface GoalOptionProps {
  instruction: string;
  icon: IconName;
}

export function GoalOption(props: GoalOptionProps) {
  return (
    <li class={classes.container} onKeyDown={navigateVertically}>
      <button class={classes.option}>
        <Icon name={props.icon} class={classes.icon} />
        <span class={classes.text}>{props.instruction}</span>
      </button>
    </li>
  );
}

function navigateVertically(event: KeyboardEvent) {
  const target = event.currentTarget;
  if (!(target instanceof HTMLElement)) return;
  switch (event.key) {
    case 'ArrowDown': {
      const next = target.nextElementSibling;
      if (next instanceof HTMLElement) next.querySelector('button')?.focus();
      return;
    }
    case 'ArrowUp': {
      const prev = target.previousElementSibling;
      if (prev instanceof HTMLElement) prev.querySelector('button')?.focus();
      else {
        target?.parentElement?.parentElement?.querySelector('input')?.focus();
      }
      return;
    }
  }
}
