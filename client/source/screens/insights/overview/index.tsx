import type { InsightsOverview } from '#/data/worker/types';
import { InsightCard } from '#/components/insight-card';
import { ElasticView } from '#/components/elastic-view';
import { For } from '@adbl/unfinished';
import { CardDrawer } from './card-drawer';
import classes from './overview.module.css';

export interface InsightsOverviewProps {
  cards: InsightsOverview['cards'];
}

export function Overview(props: InsightsOverviewProps) {
  const { cards } = props;
  const styles = { '--total': cards.length };
  return (
    <ElasticView
      yAxis
      as="ul"
      class={classes.container}
      style={styles}
      data-stagger-children
    >
      {For(props.cards, (cardDetails, index) => (
        <InsightCard {...cardDetails} index={index} />
      ))}
      <CardDrawer cards={cards} />
    </ElasticView>
  );
}
