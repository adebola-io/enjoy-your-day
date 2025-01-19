import { For, useObserver } from '@adbl/unfinished';
import { ElasticView } from '#/components/elastic-view';
import type { HistoryChartItem } from '#/services/database/types';
import type { LookupMap } from '#/library/lookup-map';
import { Temporal } from 'temporal-polyfill';
import { Cell, type SourceCell } from '@adbl/cells';
import { todayStr } from '#/data/state';
import classes from './history-chart.module.css';

export interface HistoryChartProps {
  picked: SourceCell<HistoryChartItem>;
  chartData: Cell<HistoryChartItem[]>;
  maxChartValue: Cell<number>;
  lookupMap: Cell<LookupMap<'date', HistoryChartItem>>;
  onRequestOlder: () => Promise<boolean>;
}

export function HistoryChart(props: HistoryChartProps) {
  const {
    maxChartValue: max,
    chartData,
    picked,
    lookupMap,
    onRequestOlder,
  } = props;
  const observer = useObserver();
  const containerRef = Cell.source<HTMLElement | null>(null);

  const pickedIndex = Cell.source(0); // Invariant: will always start on today.
  const containerStyles = {
    '--max': max,
    '--picked': pickedIndex,
    '--total': Cell.derived(() => chartData.value.length),
  };

  const lazyLoaderObserver = new IntersectionObserver(
    async ([{ isIntersecting, target }]) => {
      if (!isIntersecting) return;

      const moreItemsLoaded = await onRequestOlder();
      if (!moreItemsLoaded) return;

      lazyLoaderObserver.unobserve(target);
      trackOldestItemVisibility();
    }
  );

  // Delegated for performance reasons.
  const selectDate = (event: MouseEvent) => {
    const target = event.target as Element;
    const selector = `.${classes.chartItem}`;
    const clicked = target.closest<HTMLButtonElement>(selector);
    if (!clicked) return;
    const { date } = clicked.dataset;
    if (!date) return;
    const selectedItem = lookupMap.value.get(date);
    if (!selectedItem) return;
    picked.value = selectedItem;
  };

  const trackOldestItemVisibility = () => {
    const container = containerRef.deproxy();
    const lastChartItem = container.lastElementChild as HTMLElement;
    if (!lastChartItem) return;
    lazyLoaderObserver.observe(lastChartItem);
  };

  observer.onConnected(containerRef, () => {
    // IntersectionObserver doesn't work on cell proxies.
    const container = containerRef.deproxy();
    container.scrollLeft = container.scrollWidth;
    const callback: IntersectionObserverCallback = ([{ isIntersecting }]) => {
      if (isIntersecting) {
        container.dataset.shown = 'true';
        trackOldestItemVisibility();
      }
    };
    const options: IntersectionObserverInit = { threshold: 0.9 };
    const containerObserver = new IntersectionObserver(callback, options);
    containerObserver.observe(container);

    return () => {
      containerObserver.disconnect();
      lazyLoaderObserver.disconnect();
    };
  });

  return (
    <ElasticView
      ref={containerRef}
      class={classes.container}
      style={containerStyles}
      xAxis
      onClick={selectDate}
    >
      {For(chartData, (item, index) => (
        <ChartItem
          item={item}
          index={index}
          picked={picked}
          pickedIndex={pickedIndex}
        />
      ))}
    </ElasticView>
  );
}

interface ChartItemProps {
  item: HistoryChartItem;
  index: Cell<number>;
  picked: Cell<HistoryChartItem | null>;
  pickedIndex: SourceCell<number>;
}

function ChartItem(props: ChartItemProps) {
  const { item, index, picked, pickedIndex } = props;
  const { total: totalCount } = item;
  const { length: completedCount } = item.completed;
  const locale = navigator.languages[0];
  const dateStr = item.date;
  const buttonRef = Cell.source<HTMLButtonElement | null>(null);
  const date = Temporal.PlainDate.from(dateStr);
  const dateOfMonth = String(date.day).padStart(2, '0');
  const intlOptions: Intl.DateTimeFormatOptions = { weekday: 'short' };
  const dayOfWeek = String(date.toLocaleString(locale, intlOptions));
  const isToday = Cell.derived(() => dateStr === todayStr.value);
  const isSelected = Cell.derived(() => picked.value?.date === dateStr);
  const chartItemStyles = {
    '--total-height': totalCount,
    '--completed-height': completedCount,
    '---index': index,
  };

  isSelected.listen((isSelected) => {
    if (!isSelected) return;
    pickedIndex.value = index.value;
    buttonRef.value?.scrollIntoView({
      behavior: 'smooth',
      inline: 'center',
      block: 'nearest',
    });
  });

  return (
    <button
      ref={buttonRef}
      type="button"
      class={classes.chartItem}
      data-is-today={isToday}
      data-date={dateStr}
      data-is-picked-day={isSelected}
      style={chartItemStyles}
    >
      <div class={classes.chartItemDate}>{dateOfMonth}</div>
      <span class={classes.chartItemDay}>{dayOfWeek}</span>
    </button>
  );
}
