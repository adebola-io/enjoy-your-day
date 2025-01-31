import { Icon } from '#/components/icon';
import type { AutoCompleteOption } from '../search-input';
import type { GoalProps } from '#/data/entities';
import classes from './goal-option.module.css';

export interface GoalOptionProps
  extends AutoCompleteOption<GoalOptionProps>,
    GoalProps {}

export function GoalOption(props: GoalOptionProps) {
  const { icon, instruction, onSelect } = props;
  const handleSelect = () => {
    onSelect?.(props);
  };

  return (
    <li class={classes.container} onKeyDown={navigateVertically}>
      <button type="button" class={classes.option} onClick={handleSelect}>
        <Icon name={icon} class={classes.icon} />
        <span class={classes.text}>{instruction}</span>
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
