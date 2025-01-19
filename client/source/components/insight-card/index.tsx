import type { InsightCardDetails } from '#/services/database/types';
import { useRouter } from '@adbl/unfinished/router';
import classes from './insight-card.module.css';
import { Icon } from '../icon';
import type { Cell } from '@adbl/cells';
import { If } from '@adbl/unfinished';

export interface InsightCardProps extends InsightCardDetails {
  index: Cell<number>;
}

export function InsightCard(props: InsightCardProps) {
  const { name, value, icon, color, suffix, index } = props;
  const router = useRouter();
  const nameInKebabCase = name.replace(/\s/g, '-').toLowerCase();
  const link = `/insights?card=${nameInKebabCase}`;
  const style = {
    backgroundColor: color,
    '--index': index,
  };

  return (
    <li class={classes.container} style={style}>
      <router.Link class={classes.link} href={link}>
        <output id={nameInKebabCase} class={classes.value}>
          {String(value)}{' '}
          {If(suffix, (value) => {
            return <span class={classes.suffix}>{value}</span>;
          })}
        </output>
        <Icon name={icon} class={classes.icon} color="white" title="Icon" />
        <label for={nameInKebabCase} class={classes.label}>
          {name}
        </label>
      </router.Link>
    </li>
  );
}
