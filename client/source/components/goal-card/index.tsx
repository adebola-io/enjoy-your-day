import { Cell } from '@adbl/cells';
import classes from './goal-card.module.css';
import { lightenHexColor } from '#/library/utils';
import type { GoalProps } from '#/data/entities';
import { Icon } from '#/components/icon';

export function GoalCard(props: GoalProps) {
  const styles = {
    '--bg-color': props.color,
    '--index': Cell.derived(() => String(props.index?.value)),
    '--bg-color-light': lightenHexColor(props.color),
  };

  return (
    <li class={classes.card} style={styles}>
      <Icon
        name={props.icon}
        class={classes.icon}
        color="white"
        secondaryColor={props.color}
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
        secondaryColor={props.color}
        inert
        inline
      />
    </li>
  );
}
