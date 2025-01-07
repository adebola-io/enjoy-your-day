import { For, useObserver } from '@adbl/unfinished';
import type {
  HistoryChartItem,
  InsightHistoryDetails,
} from '#/data/worker/types';
import { Temporal } from 'temporal-polyfill';
import { Cell } from '@adbl/cells';
import { ElasticView } from '../elastic-view';
import classes from './history-chart.module.css';

export interface HistoryChartProps {
  today: Cell<string | undefined>;
  selectedDay?: Cell<string | undefined>;
  onSelectDate?: (date: string, data: HistoryChartItem) => void;
  details: InsightHistoryDetails;
}

export function HistoryChart(props: HistoryChartProps) {
  const observer = useObserver();
  const containerRef = Cell.source<HTMLElement | null>(null);
  const locale = navigator.languages[0];
  const { details, selectedDay, today, onSelectDate } = props;
  const { maxChartValue: max, chartData } = details;
  const containerStyles = { '--total': chartData.length };

  observer.onConnected(containerRef, (container) => {
    container.scrollLeft = container.scrollWidth;
  });

  return (
    <ElasticView
      ref={containerRef}
      class={classes.container}
      style={containerStyles}
      xAxis
    >
      {For(chartData, (item) => {
        const { total, completed } = item.value;
        const dateStr = item.date.slice(0, -1);
        const totalBarStyles = { height: `${(total / max) * 100}%` };
        const completedBarStyles = { height: `${(completed / max) * 100}%` };
        const date = Temporal.ZonedDateTime.from(`${dateStr}[UTC]`);
        const dateOfMonth = String(date.day).padStart(2, '0');
        const intlOptions: Intl.DateTimeFormatOptions = { weekday: 'short' };
        const dayOfWeek = String(date.toLocaleString(locale, intlOptions));
        const dayMarker = date.startOfDay().toPlainDateTime().toString();
        const isToday = Cell.derived(() => dayMarker === today.value);
        const isSelected = Cell.derived(() => selectedDay?.value === dayMarker);

        const selectDate = () => onSelectDate?.(dayMarker, item);

        if (isToday.value && item.value) selectDate();

        return (
          <button
            type="button"
            class={classes.chartItem}
            data-is-today={isToday}
            data-is-selected-day={isSelected}
            onClick={selectDate}
          >
            <div class={classes.total} style={totalBarStyles} />
            <div class={classes.completed} style={completedBarStyles} />
            <div class={classes.chartItemDate}>{dateOfMonth}</div>
            <span class={classes.chartItemDay}>{dayOfWeek}</span>
          </button>
        );
      })}
    </ElasticView>
  );
}
