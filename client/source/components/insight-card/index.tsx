import type { InsightCardDetails } from '#/data/worker/types';
import { useRouter } from '@adbl/unfinished/router';
import classes from './insight-card.module.css';
import { Icon } from '../icon';
import type { Cell } from '@adbl/cells';
import { If } from '@adbl/unfinished';

export interface InsightCardProps extends InsightCardDetails {
  index: Cell<number>;
}

export function InsightCard(props: InsightCardProps) {
  const router = useRouter();
  const nameInKebabCase = props.name.replace(/\s/g, '-').toLowerCase();
  const link = `/insights?card=${nameInKebabCase}`;
  const style = {
    backgroundColor: props.color,
    viewTransitionName: nameInKebabCase,
    '--index': props.index,
  };

  return (
    <li class={classes.container} style={style}>
      <router.Link class={classes.link} href={link}>
        <output id={nameInKebabCase} class={classes.value}>
          {String(props.value)}{' '}
          {If(props.suffix, (value) => {
            return <span class={classes.suffix}>{value}</span>;
          })}
        </output>
        <Icon
          name={props.icon}
          class={classes.icon}
          color="white"
          title="Icon"
        />
        <label for={nameInKebabCase} class={classes.label}>
          {props.name}
        </label>
      </router.Link>
    </li>
  );
}
