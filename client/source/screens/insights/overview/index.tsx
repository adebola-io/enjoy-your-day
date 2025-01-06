import type { InsightsOverview } from '#/data/worker/types';
import { InsightCard } from '#/components/insight-card';
import type { SourceCell } from '@adbl/cells';
import { For } from '@adbl/unfinished';
import { CardDrawer } from './card-drawer';
import classes from './overview.module.css';
import { ElasticView } from '#/components/elastic-view';

export interface InsightsOverviewProps {
  ref: SourceCell<HTMLElement | null>;
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
