import type { InsightsOverview } from '#/services/database/types';
import { InsightCard } from '#/components/insight-card';
import { For } from '@adbl/unfinished';
import { CardDrawer } from './card-drawer';
import classes from './overview.module.css';

export interface InsightsOverviewProps {
  cards: InsightsOverview['cards'];
}

export default function Overview(props: InsightsOverviewProps) {
  const { cards } = props;
  const styles = { '--total': cards.length };
  return (
    <ul class={classes.container} style={styles} data-stagger-children>
      {For(cards, (cardDetails, index) => (
        <InsightCard {...cardDetails} index={index} />
      ))}
      <CardDrawer cards={cards} />
    </ul>
  );
}
