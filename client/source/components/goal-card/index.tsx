import { Cell } from '@adbl/cells';
import classes from './goal-card.module.css';
import { lightenHexColor } from '#/library/utils';
import type { IconName } from '#/library/icon-name';
import { Icon } from '#/components/icon';

export interface GoalCardProps {
  index?: Cell<number>;
  title: string;
  instruction: string;
  info: string;
  color: string;
  icon: IconName;
}

export function GoalCard(props: GoalCardProps) {
  // I don't want to set the view transition until the animation is finished,
  // so that transitioning back to the previous view in auto-selection
  // doesn't cause a flicker.
  const viewTransitionName = Cell.source<string | undefined>(undefined);
  const styles = {
    '--bg-color': props.color,
    '--index': props.index,
    '--bg-color-light': lightenHexColor(props.color),
    viewTransitionName,
  };

  const setViewTransition = () => {
    viewTransitionName.value = `goal-card-${props.index?.value}`;
  };

  return (
    <li
      onAnimationEnd--self={setViewTransition}
      class={classes.card}
      style={styles}
    >
      <div class={classes.iconContainer}>
        <Icon name={props.icon} class={classes.icon} inert />
      </div>
      <h2 class={classes.title}>{props.title}</h2>
      <p class={classes.instruction}>{props.instruction}</p>
      <p class={classes.info}>{props.info}</p>
      <Icon name={props.icon} inert class={classes.iconOverlay} />
    </li>
  );
}
