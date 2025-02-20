import { Cell } from '@adbl/cells';
import classes from './goal-card.module.css';
import type { GoalProps } from '#/data/entities';
import { Icon } from '#/components/icon';
import { lightenHexColor } from '@adbl/iota/utils/misc';

export function GoalCard(props: GoalProps) {
  const { color, index, icon, title, instruction, info } = props;
  const styles = {
    '--bg-color': color,
    '--index': Cell.derived(() => String(index?.value)),
    '--bg-color-light': lightenHexColor(color),
  };

  return (
    <li class={classes.card} style={styles}>
      <Icon
        name={icon}
        class={classes.icon}
        color="white"
        secondaryColor={color}
        title="Icon related to the goal"
        inert
        inline
      />
      <h2 class={classes.title}>{title}</h2>
      <p class={classes.instruction}>{instruction}</p>
      <p class={classes.info}>{info}</p>
      <Icon
        name={icon}
        class={classes.overlay}
        color="white"
        title="Icon overlay for the goal"
        secondaryColor={color}
        inert
        inline
      />
    </li>
  );
}
