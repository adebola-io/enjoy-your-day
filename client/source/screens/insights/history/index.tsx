import { HistoryChart } from '#/components/history-chart';
import { Loader } from '#/components/loader';
import { Stepper } from '#/components/stepper';
import { GoalItem } from '#/components/goal-item';
import { EmptyIcon } from '#/components/icons/empty';
import { getInsightsHistory } from '#/data/services';
import type {
  HistoryChartItem,
  InsightHistoryDetails,
} from '#/data/worker/types';
import { todayStr } from '#/data/state';
import { defer, getResourceState, LookupMap, NoOp } from '#/library/utils';
import { Cell } from '@adbl/cells';
import { For, If, Switch, useObserver } from '@adbl/unfinished';
import { Temporal } from 'temporal-polyfill';
import { ProgressBar } from '#/components/progress-bar';
import { CSS_VARS } from '#/styles/variables';
import classes from './history.module.css';
import SettingsIcon from '#/components/icons/settings';

export function History() {
  const observer = useObserver();
  const resource = Cell.async(getInsightsHistory);
  const state = getResourceState(resource);
  const containerRef = Cell.source<HTMLDivElement | null>(null);
  const today = Temporal.PlainDate.from(todayStr.value);
  const chunkSize = 15;
  const fifteenDaysAgo = today.subtract({ days: chunkSize });

  observer.onConnected(containerRef, async () => {
    const params = { start: fifteenDaysAgo.toString(), end: today.toString() };
    await resource.run(params);
  });

  const Loading = () => <Loader />;
  const ErrorOccurred = () => <>Error: {resource.error.value?.message}</>;

  return (
    <div ref={containerRef} class={classes.container} data-state={state}>
      {Switch(state, {
        inert: NoOp,
        pending: Loading,
        success: () => (
          <LoadedHistoryView
            today={today}
            startDate={fifteenDaysAgo}
            chunkSize={chunkSize}
            details={resource.data.value}
          />
        ),
        error: ErrorOccurred,
      })}
    </div>
  );
}

interface LoadedHistoryProps {
  today: Temporal.PlainDate;
  startDate: Temporal.PlainDate;
  chunkSize: number;
  details: InsightHistoryDetails | null;
}

function LoadedHistoryView(props: LoadedHistoryProps) {
  const { details, startDate, chunkSize, today } = props;
  let lowerBounds = startDate;
  let upperBounds = today;
  if (!details) return;

  const { maxChartValue: maxChartValueRaw, chartData: chartDataRaw } = details;
  const maxChartValue = Cell.source(maxChartValueRaw);
  const chartData = Cell.source(chartDataRaw);
  const lookupMap = Cell.derived(() => new LookupMap(chartData.value, 'date'));

  // Whenever the user scrolls to the start of the chart,
  // we want to fetch data for older dates.
  const { data: olderData, run: getOlder } = Cell.async(getInsightsHistory);
  olderData.listen((data) => {
    if (!data) return;
    const { maxChartValue: olderMax, chartData: olderChartData } = data;
    maxChartValue.value = Math.max(maxChartValue.value, olderMax);
    chartData.value.push(...olderChartData);
  });

  const locale = navigator.languages[0];
  const weekdayOptions: Intl.DateTimeFormatOptions = { weekday: 'long' };
  const dateOptions: Intl.DateTimeFormatOptions = {
    month: 'long',
    year: 'numeric',
    day: '2-digit',
  };

  // Invariant: The first item in the array is always today.
  const todayDetails = chartDataRaw[0];
  const picked = Cell.source<HistoryChartItem>(todayDetails);

  const pickedDay = Cell.derived(() => picked.value.date);
  const pickedDate = Cell.derived(() => {
    return Temporal.PlainDate.from(pickedDay.value);
  });
  const pickedIsToday = Cell.derived(() => pickedDay.value === todayStr.value);
  const pickedIsNotToday = Cell.derived(() => !pickedIsToday.value);
  const pickedDateDayString = Cell.derived(() => {
    return pickedDate.value.toLocaleString(locale, weekdayOptions);
  });
  const pickedDateString = Cell.derived(() => {
    return pickedDate.value.toLocaleString(locale, dateOptions);
  });
  const pickedCompleted = Cell.derived(() => {
    return picked.value?.completed ?? [];
  });
  const pickedUnfinished = Cell.derived(() => {
    return picked.value?.unfinished ?? [];
  });

  const pickedHasGoals = Cell.derived(() => {
    return Boolean(
      pickedCompleted.value.length || pickedUnfinished.value.length
    );
  });

  // The data has to be updated manually,
  // because Temporal object is not trackable by cells.
  pickedDay.listen(() => defer(() => pickedDate.update()));

  const goToPreviousDay = () => {
    const previous = pickedDate.value.subtract({ days: 1 });
    const newPickedItem = lookupMap.value.get(previous.toString());
    if (newPickedItem) picked.value = newPickedItem;
  };

  const goToNextDay = () => {
    const next = pickedDate.value.add({ days: 1 });
    const newPickedItem = lookupMap.value.get(next.toString());
    if (newPickedItem) picked.value = newPickedItem;
  };

  const requestOlderData = async () => {
    upperBounds = lowerBounds;
    lowerBounds = lowerBounds.subtract({ days: chunkSize });
    await getOlder({
      start: lowerBounds.toString(),
      end: upperBounds.toString(),
    });
    return olderData.value !== null;
  };
  return (
    <>
      <HistoryChart
        picked={picked}
        chartData={chartData}
        lookupMap={lookupMap}
        maxChartValue={maxChartValue}
        onRequestOlder={requestOlderData}
      />
      <Stepper
        class={classes.stepper}
        forwardsEnabled={pickedIsNotToday}
        onBackwards={goToPreviousDay}
        onForwards={goToNextDay}
      >
        <p class={classes.day}>{pickedDateDayString}</p>
        <h2 class={classes.date}>{pickedDateString}</h2>
      </Stepper>
      {If(pickedIsToday, {
        true: ComputingScreen,
        false: () =>
          If(pickedHasGoals, {
            true: () => <SelectedDayDetails picked={picked} />,
            false: EmptyScreen,
          }),
      })}
    </>
  );
}

interface DayDetailsProps {
  picked: Cell<HistoryChartItem>;
}

function SelectedDayDetails(props: DayDetailsProps) {
  const { picked } = props;

  const pickedTotal = Cell.derived(() => {
    return picked.value?.total;
  });

  const pickedCompleted = Cell.derived(() => {
    return picked.value?.completed ?? [];
  });

  const pickedUnfinished = Cell.derived(() => {
    return picked.value?.unfinished ?? [];
  });

  const pickedCompletedCount = Cell.derived(() => {
    return picked.value?.completed.length;
  });

  const pickedHasUnfinished = Cell.derived(() => {
    return Boolean(picked.value?.unfinished.length);
  });

  const pickedCategoryProfile = Cell.derived(() => {
    if (!picked.value) return '';
    const { categories: categoryProfile } = picked.value;
    return categoryProfile.reduce((str, category, index) => {
      if (index === 0) return category;
      if (index === categoryProfile.length - 1) return `${str} and ${category}`;
      return `${str}, ${category}`;
    }, '');
  });

  const pickedItemPercent = Cell.derived(() => {
    if (!picked.value) return 0;
    const { total, completed: completedGoals } = picked.value;
    const { length: completed } = completedGoals;
    return (completed / total) * 100;
  });

  const color = Cell.derived(() => {
    if (pickedItemPercent.value <= 30) return '#ff0000';
    if (pickedItemPercent.value <= 60) return CSS_VARS['--space-cadet-500'];
    if (pickedItemPercent.value <= 90) return '#75700d';
    return '#056e05';
  });

  return (
    <div class={classes.selectedItem}>
      <span class={classes.remark}>
        You completed {pickedCompletedCount} out of {pickedTotal} goals relating
        to {pickedCategoryProfile}.
      </span>
      <ProgressBar
        class={classes.percent}
        percent={pickedItemPercent}
        color={color}
      />
      {If(pickedCompletedCount, () => (
        <>
          <h3 class={classes.goalsHeading}>Completed Goals</h3>
          <ul class={classes.goalsList}>
            {For(pickedCompleted, (state) => (
              <GoalItem
                {...state.goal}
                cancelable={false}
                timeStamp={state.updatedAt}
              />
            ))}
          </ul>
        </>
      ))}
      {If(pickedHasUnfinished, () => (
        <>
          <h3 class={[classes.goalsHeading, classes.unfinishedGoalsHeading]}>
            Unfinished Goals
          </h3>
          <ul class={[classes.goalsList, classes.unfinishedGoalsList]}>
            {For(pickedUnfinished, (state) => (
              <GoalItem
                {...state.goal}
                cancelable={false}
                timeStamp={state.updatedAt}
              />
            ))}
          </ul>
        </>
      ))}
    </div>
  );
}

function EmptyScreen() {
  return (
    <div class={classes.fadedText}>
      <EmptyIcon class={classes.emptyIcon} />
      <span class={classes.fadedTextContent}>
        No data available for this day.
      </span>
    </div>
  );
}

function ComputingScreen() {
  return (
    <div class={classes.fadedText}>
      <SettingsIcon class={classes.settingsIcon} />
      <span class={classes.fadedTextContent}>Computing. Check back later.</span>
    </div>
  );
}
