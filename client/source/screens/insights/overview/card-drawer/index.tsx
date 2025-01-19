import { BottomDrawer } from '#/components/bottom-drawer';
import type { InsightCardDetails } from '#/services/database/types';
import { Cell } from '@adbl/cells';
import { useRouter } from '@adbl/unfinished/router';
import { Icon, loadIconDataUrl } from '#/components/icon';
import { Button } from '#/components/button';
import classes from './card-drawer.module.css';
import { If } from '@adbl/unfinished';
import { toKebabCase } from '#/library/utils';

export interface CardDrawerProps {
  cards: InsightCardDetails[];
}

export function CardDrawer(props: CardDrawerProps) {
  const { cards } = props;
  const router = useRouter();
  const route = router.getCurrentRoute();
  const isOpen = Cell.derived(() => route.value.query.has('card'));
  const backgroundImage = Cell.source<string | undefined>(undefined);
  const card = Cell.source<InsightCardDetails | undefined>(undefined);

  const goBackToInsights = () => {
    return router.navigate('/insights');
  };

  // This is a unidirectional effect so that the card is not
  // automatically unset when the drawer closes, leading to
  // glitches in the drawer content as it animates out.
  isOpen.runAndListen((drawerIsOpen) => {
    if (!drawerIsOpen) return;
    card.value = cards.find(
      (c) => toKebabCase(c.name) === route.value.query.get('card')
    );
  });

  const openCardName = Cell.derived(
    () => `${toKebabCase(card.value?.name ?? '')}-open`
  );
  const openCardValue = Cell.derived(() => card.value?.value);
  const openCardLabel = Cell.derived(() => card.value?.name);
  const cardIcon = Cell.derived(() => card.value?.icon);
  const cardSuffix = Cell.derived(() => card.value?.suffix);
  const cardDescription = Cell.derived(() => card.value?.description);
  const backgroundColor = Cell.derived(() => card.value?.color);

  cardIcon.runAndListen(async (icon) => {
    if (!icon) return;
    const src = await loadIconDataUrl(icon, {
      width: '100px',
      height: '100px',
      color: 'white',
    });
    backgroundImage.value = `url('${src}')`;
  });

  return (
    <BottomDrawer
      class={classes.drawerContainer}
      open={isOpen}
      onClose={goBackToInsights}
      shrinkTarget="#insightsContainer"
      style={{ backgroundColor }}
    >
      <div class={classes.overlay} style={{ backgroundImage }} />
      <Icon
        name={cardIcon}
        class={classes.icon}
        inline
        color="white"
        title="Card Icon"
      />
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
