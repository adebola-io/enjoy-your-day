import { HistoryChart } from '#/components/history-chart';
import { Loader } from '#/components/loader';
import { Stepper } from '#/components/stepper';
import { getInsightsHistory } from '#/data/services';
import type {
  HistoryChartItem,
  InsightHistoryDetails,
} from '#/data/worker/types';
import { getResourceState, NoOp } from '#/library/utils';
import { dailyGoals, liveDate } from '#/data/state';
import { Cell } from '@adbl/cells';
import { Switch, useObserver } from '@adbl/unfinished';
import { Temporal } from 'temporal-polyfill';
import { ProgressBar } from '#/components/progress-bar';
import { CSS_VARS } from '#/styles/variables';
import classes from './history.module.css';

export function History() {
  const observer = useObserver();
  const resource = Cell.async(getInsightsHistory);
  const state = getResourceState(resource);
  const containerRef = Cell.source<HTMLDivElement | null>(null);

  observer.onConnected(containerRef, async () => {
    await resource.run(dailyGoals.value);
  });

  const Loading = () => <Loader />;
  const ErrorOccurred = () => <>Error: {resource.error.value?.message}</>;

  return (
    <div ref={containerRef} class={classes.container} data-state={state}>
      {Switch(state, {
        inert: NoOp,
        pending: Loading,
        success: () => <Loaded details={resource.data.value} />,
        error: ErrorOccurred,
      })}
    </div>
  );
}

interface LoadedHistoryProps {
  details: InsightHistoryDetails | null;
}

function Loaded(props: LoadedHistoryProps) {
  const { details } = props;
  if (!details) return;

  const locale = navigator.languages[0];
  const weekdayOptions: Intl.DateTimeFormatOptions = { weekday: 'long' };
  const dateOptions: Intl.DateTimeFormatOptions = {
    month: 'long',
    year: 'numeric',
    day: '2-digit',
  };

  const today = Cell.derived(() => {
    liveDate.value;
    return Temporal.Now.zonedDateTimeISO()
      .startOfDay()
      .toPlainDateTime()
      .toString();
  });
  const selectedDay = Cell.source(today.value);
  const selectedItem = Cell.source<HistoryChartItem | null>(null);
  const selectedDateTime = Cell.derived(() => {
    return Temporal.PlainDateTime.from(selectedDay.value);
  });
  const selectedDateDayString = Cell.derived(() => {
    return selectedDateTime.value.toLocaleString(locale, weekdayOptions);
  });
  const selectedDateString = Cell.derived(() => {
    return selectedDateTime.value.toLocaleString(locale, dateOptions);
  });
  const selectedCompleted = Cell.derived(() => {
    return selectedItem.value?.value.completed;
  });
  const selectedTotal = Cell.derived(() => {
    return selectedItem.value?.value.total;
  });
  const selectedItemPercent = Cell.derived(() => {
    if (!selectedItem.value) return 0;
    const { completed, total } = selectedItem.value.value;
    return (completed / total) * 100;
  });
  const color = Cell.derived(() => {
    if (selectedItemPercent.value <= 30) return '#ff0000';
    if (selectedItemPercent.value <= 60) return CSS_VARS['--space-cadet-500'];
    if (selectedItemPercent.value <= 90) return '#75700d';
    return '#056e05';
  });
  const selectedCategoryProfile = Cell.derived(() => {
    if (!selectedItem.value) return '';
    const { categoryProfile } = selectedItem.value;
    return categoryProfile.reduce((str, category, index) => {
      if (index === 0) return category;
      if (index === categoryProfile.length - 1) return `${str} and ${category}`;
      return `${str}, ${category}`;
    }, '');
  });

  const handleDateSelection = (date: string, item: HistoryChartItem) => {
    selectedDay.value = date;
    selectedItem.value = item;
    // The cell has to be updated manually, because Temporal object changes
    // are not trackable by cells.
    selectedDateTime.update();
  };

  return (
    <>
      <HistoryChart
        today={today}
        selectedDay={selectedDay}
        details={details}
        onSelectDate={handleDateSelection}
      />
      <Stepper class={classes.stepper}>
        <p class={classes.day}>{selectedDateDayString}</p>
        <h2 class={classes.date}>{selectedDateString}</h2>
      </Stepper>
      <span class={classes.remark}>
        You completed {selectedCompleted} out of {selectedTotal} goals relating
        to {selectedCategoryProfile}.
      </span>
      <ProgressBar
        class={classes.percent}
        percent={selectedItemPercent}
        color={color}
      />
      <h3 class={classes.completedGoalsHeading}>Completed Goals</h3>
    </>
  );
}
