import BarChartIcon from '#/components/icons/bar-chart';
import AnchorIcon from '#/components/icons/anchor';
import TrophyIcon from '#/components/icons/trophy';
import CalendarIcon from '#/components/icons/calendar';
import StackIcon from '#/components/icons/stack';
import type { JSX } from '@adbl/unfinished/jsx-runtime';
import { BottomDrawer } from '#/components/bottom-drawer';
import type { InsightCardDetails } from '#/services/database/types';
import { Cell } from '@adbl/cells';
import { useRouter } from '@adbl/unfinished/router';
import { loadIconDataUrlEager } from '#/components/icon';
import { Button } from '#/components/button';
import { If, Switch } from '@adbl/unfinished';
import { defer, NoOp, toKebabCase, useRouteQuery } from '#/library/utils';
import classes from './card-drawer.module.css';

export interface CardDrawerProps {
  cards: InsightCardDetails[];
}

const icons: Record<string, () => JSX.Template> = {
  'bar-chart': () => <BarChartIcon class={classes.icon} />,
  anchor: () => <AnchorIcon class={classes.icon} />,
  trophy: () => <TrophyIcon class={classes.icon} />,
  calendar: () => <CalendarIcon class={classes.icon} />,
  stack: () => <StackIcon class={classes.icon} />,
};

export function CardDrawer(props: CardDrawerProps) {
  const { cards } = props;
  const router = useRouter();
  const route = router.getCurrentRoute();
  const isOpen = useRouteQuery('card');
  const card = Cell.source<InsightCardDetails | undefined>(undefined);

  const goBackToInsights = () => {
    return router.navigate('/insights');
  };

  // This is a unidirectional effect so that the card is not
  // automatically unset when the drawer closes, leading to
  // glitches in the drawer content as it animates out.
  isOpen.runAndListen((drawerIsOpen) => {
    defer(() => {
      if (!drawerIsOpen) return;
      card.value = cards.find(
        (c) => toKebabCase(c.name) === route.value.query.get('card')
      );
    });
  });

  const openCardName = Cell.derived(
    () => `${toKebabCase(card.value?.name ?? '')}-open`
  );
  const openCardValue = Cell.derived(() => card.value?.value);
  const openCardLabel = Cell.derived(() => card.value?.name);
  const cardIconName = Cell.derived(() => card.value?.icon ?? '');
  const cardIcon = Cell.derived(() => icons[card.value?.icon ?? '']);
  const cardSuffix = Cell.derived(() => card.value?.suffix);
  const cardDescription = Cell.derived(() => card.value?.description);
  const backgroundColor = Cell.derived(() => card.value?.color);
  const backgroundImage = Cell.derived(
    () => `url('${loadIconDataUrlEager(cardIcon.value)}')`
  );

  return (
    <BottomDrawer
      class={classes.drawerContainer}
      open={isOpen}
      onClose={goBackToInsights}
      shrinkTarget="#insightsContainer"
      style={{ backgroundColor }}
    >
      <div class={classes.overlay} style={{ backgroundImage }} />
      {Switch(cardIconName, icons, NoOp)}
      <output id={openCardName} class={classes.value}>
        {openCardValue}{' '}
        {If(cardSuffix, (value) => (
          <span class={classes.suffix}>{value}</span>
        ))}
      </output>
      <label class={classes.label} for={openCardName}>
        {openCardLabel}
      </label>
      <p class={classes.description}>{cardDescription}</p>
      <Button
        class={classes.button}
        variant="outlined"
        rounded
        onClick={goBackToInsights}
      >
        Close
      </Button>
    </BottomDrawer>
  );
}
