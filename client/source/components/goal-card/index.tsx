import { Cell } from '@adbl/cells';
import classes from './goal-card.module.css';
import { lightenHexColor } from '#/library/utils';
import type { GoalProps } from '#/data/entities';
import { Icon } from '#/components/icon';

export function GoalCard(props: GoalProps) {
  // I don't want to set the view transition until the animation is finished,
  // so it doesn't transition back from goal items, causing a weird flicker.
  const cardLoaded = Cell.source(false);
  const viewTransitionName = Cell.derived(() => {
    if (cardLoaded.value) return `goal-card-${props.index?.value}`;
    return 'unset';
  });
  const styles = {
    '--bg-color': props.color,
    '--index': Cell.derived(() => String(props.index?.value)),
    '--bg-color-light': lightenHexColor(props.color),
    viewTransitionName,
  };

  const setViewTransition = () => {
    cardLoaded.value = true;
  };

  return (
    <li
      onAnimationEnd--self={setViewTransition}
      class={classes.card}
      style={styles}
    >
      <Icon
        name={props.icon}
        class={classes.icon}
        color="white"
        title="Icon related to the goal"
        inert
        inline
      />
      <h2 class={classes.title}>{props.title}</h2>
      <p class={classes.instruction}>{props.instruction}</p>
      <p class={classes.info}>{props.info}</p>
      <Icon
        name={props.icon}
        class={classes.overlay}
        color="white"
        title="Icon overlay for the goal"
        inert
        inline
      />
    </li>
  );
}
