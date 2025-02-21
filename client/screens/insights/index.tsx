import { Cell } from '@adbl/cells';
import { getInsightsOverview } from '#/services/database';
import { NoOp, vibrate } from '#/library/utils';
import { Switch, useObserver } from '@adbl/unfinished';
import { Icon } from '#/components/icon';
import { Sparkles } from '#/components/sparkles';
import { Loader } from '#/components/loader';
import { Button } from '#/components/button';
import { dailyGoals } from '#/data/state';
import Overview from './overview';
import History from './history';
import classes from './insights.module.css';
import { useResourceState } from '@adbl/iota/hooks/use-resource-state';

export default function Insights() {
  const observer = useObserver();
  const resource = Cell.async(getInsightsOverview);
  const containerRef = Cell.source<HTMLDivElement | null>(null);
  const selectedTab = Cell.source<'overview' | 'history'>('overview');

  const state = useResourceState(resource);

  const Loading = () => <Loader class={classes.mainLoader} />;

  const ErrorOccurred = () => (
    <div class={classes.errorContainer}>
      <div class={classes.error}>Error occurred.</div>
    </div>
  );

  const Loaded = () => {
    if (!resource.data.value) return null;
    const { cards, userBadge } = resource.data.value;

    const setSelectedTab = function (this: HTMLButtonElement) {
      vibrate();
      const name = this.dataset.tabName as 'overview' | 'history';
      selectedTab.value = name;
      if (!containerRef.value) return;
      const container = containerRef.value;
      const { scrollTop: top, scrollWidth } = container;
      const left = name === 'overview' ? 0 : scrollWidth / 2;
      // Im using scrollTo() on the container because scrollIntoView()
      // for each tab scrolls vertically, regardless of the block option set.
      container.scrollTo({ left, top, behavior: 'instant' });
    };

    return (
      <>
        <section class={classes.heading}>
          <Sparkles>
            <Icon name={userBadge.icon} class={classes.userBadgeIcon} />
          </Sparkles>
          <h2 class={classes.userDesignation}>{userBadge.name}</h2>
          <p class={classes.headingDescription}>{userBadge.description}</p>
        </section>
        <div class={classes.tabList}>
          <div class={classes.pillHighlighter} />
          <Button
            type="button"
            variant="transparent"
            data-tab-name="overview"
            class={classes.overviewTabPill}
            onClick={setSelectedTab}
            rounded
          >
            Overview
          </Button>
          <Button
            type="button"
            variant="transparent"
            class={classes.historyTabPill}
            data-tab-name="history"
            onClick={setSelectedTab}
            rounded
          >
            History
          </Button>
        </div>
        <Overview cards={cards} />
        <History />
      </>
    );
  };

  observer.onConnected(containerRef, () => {
    resource.run(dailyGoals.value);
  });

  return (
    <div
      id="insightsContainer"
      ref={containerRef}
      class={classes.container}
      data-state={state}
      data-selected-tab={selectedTab}
    >
      {Switch(state, {
        inert: NoOp,
        pending: Loading,
        error: ErrorOccurred,
        success: Loaded,
      })}
    </div>
  );
}
