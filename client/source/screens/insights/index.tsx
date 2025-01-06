import { Cell } from '@adbl/cells';
import { getInsightsOverview } from '#/data/services';
import {
  getResourceState,
  initScrollTimeline,
  NoOp,
  setMetaTheme,
  vibrate,
} from '#/library/utils';
import { Switch, useObserver } from '@adbl/unfinished';
import { Icon } from '#/components/icon';
import { CSS_VARS } from '#/styles/variables';
import { Sparkles } from '#/components/sparkles';
import { Loader } from '#/components/loader';
import { Button } from '#/components/button';
import { Overview } from './overview';
import { History } from './history';
import { dailyGoals } from '#/data/state';
import classes from './insights.module.css';

export default function Insights() {
  const observer = useObserver();
  const resource = Cell.async(getInsightsOverview);
  const containerRef = Cell.source<HTMLDivElement | null>(null);

  const state = getResourceState(resource);

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
      if (!containerRef.value) return;
      const container = containerRef.value;
      // Im using scrollTo() on the container because scrollIntoView()
      // for each tab scrolls vertically, regardless of the block option set.
      container.scrollTo({
        left: name === 'overview' ? 0 : container.scrollWidth / 2,
        behavior: 'smooth',
      });
    };

    observer.onConnected(containerRef, (div) => {
      if (initScrollTimeline(div, 'inline')) {
        return () => div.getAnimations().at(0)?.finish();
      }
    });

    return (
      <>
        <Icon
          name={userBadge.icon}
          class={classes.userBadgeOverlay}
          title="User Badge Overlay"
          color={CSS_VARS['--space-cadet-500']}
          inline
        />
        <section class={classes.heading} data-stagger-children>
          <Sparkles>
            <Icon
              name={userBadge.icon}
              class={classes.userBadgeIcon}
              title="User Badge"
              color={CSS_VARS['--space-cadet-500']}
              inline
            />
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
    setMetaTheme('#ffffff');
    resource.run(dailyGoals.value);
  });

  return (
    <div
      id="insightsContainer"
      ref={containerRef}
      class={classes.container}
      data-state={state}
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
