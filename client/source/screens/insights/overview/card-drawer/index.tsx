import { BottomDrawer } from '#/components/bottom-drawer';
import type { InsightCardDetails } from '#/data/worker/types';
import { Cell } from '@adbl/cells';
import { useRouter } from '@adbl/unfinished/router';
import { Icon, loadIconDataUrl } from '#/components/icon';
import { Button } from '#/components/button';
import classes from './card-drawer.module.css';
import { If } from '@adbl/unfinished';

export interface CardDrawerProps {
  cards: InsightCardDetails[];
}

export function CardDrawer(props: CardDrawerProps) {
  const { cards } = props;
  const router = useRouter();
  const route = router.getCurrentRoute();
  const isOpen = Cell.derived(() => route.value.query.has('card'));
  const overlayRef = Cell.source<HTMLElement | null>(null);

  const goBackToInsights = () => {
    return router.navigate('/insights');
  };

  const card = Cell.derived(() => {
    return cards.find(
      (card) =>
        card.name.replace(/\s/g, '-').toLowerCase() ===
        route.value.query.get('card')
    );
  });
  const openCardName = Cell.derived(
    () => `${card.value?.name.replace(/\s/g, '-').toLowerCase()}-open`
  );
  const openCardValue = Cell.derived(() => card.value?.value);
  const openCardLabel = Cell.derived(() => card.value?.name);
  const cardIcon = Cell.derived(() => card.value?.icon);
  const cardSuffix = Cell.derived(() => card.value?.suffix);
  const cardDescription = Cell.derived(() => card.value?.description);
  const backgroundColor = Cell.source<string | undefined>(undefined);

  //  An effect so the drawer does not switch back to white instantly
  // when it is closed.
  card.runAndListen((card) => {
    if (card) backgroundColor.value = card.color;
  });

  cardIcon.runAndListen(async (icon) => {
    if (!icon) return;
    const src = await loadIconDataUrl(icon, {
      width: '100px',
      height: '100px',
      color: 'white',
    });
    console.log(icon, src);
    overlayRef.value?.style.removeProperty('background');
    overlayRef.value?.style.setProperty('background', `url('${src}')`);
  });

  return (
    <BottomDrawer
      class={classes.drawerContainer}
      open={isOpen}
      onClose={goBackToInsights}
      shrinkTarget="#insightsContainer"
      style={{ backgroundColor }}
    >
      <div ref={overlayRef} class={classes.overlay} />
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
