import type { IconName } from '#/library/icon-name';
import { elementAnimationsFinished } from '#/library/utils';
import { useObserver } from '@adbl/unfinished';
import { InlinedIcon } from '#/components/inlined-icon';
import type { JSX } from '@adbl/unfinished/jsx-runtime';
import { If } from '@adbl/unfinished';
import { Cell } from '@adbl/cells';
import { Icon } from '../icon';
import { XIcon } from '#/components/icons/x';
import { Temporal } from 'temporal-polyfill';
import classes from './goal-item.module.css';

type DivProps = JSX.IntrinsicElements['div'];
export interface GoalItemProps extends DivProps {
  title: string;
  icon: IconName;
  index?: Cell<number>;
  color: string;
  instruction: string;
  listItem?: boolean;
  labelFor?: JSX.ValueOrCell<string>;
  cancelable?: boolean;
  timeStamp?: string | null;
  containerClass?: JSX.ValueOrCell<string>;
  onRemove?: (
    item: number,
    container: HTMLElement,
    type: 'Swipe' | 'Tap'
  ) => void;
}

export function GoalItem(props: GoalItemProps) {
  const containerRef = Cell.source<HTMLElement | null>(null);
  const wrapperRef = Cell.source<HTMLElement | null>(null);
  const observer = useObserver();
  const {
    title,
    icon,
    color,
    instruction,
    labelFor,
    timeStamp,
    index,
    containerClass,
    onRemove,
    cancelable = true,
    listItem = true,
    ...rest
  } = props;
  const styles = { '--level': index, '--bg-color': color };

  const removeItem = () => {
    if (!containerRef.value || !index) return;
    onRemove?.(index.value, containerRef.value, 'Tap');
  };

  observer.onConnected(wrapperRef, async (wrapper) => {
    // Intersection Observer doesn't work on cell values directly
    // because they are proxies.
    const container = containerRef.deproxy();

    if (listItem) {
      container.scrollLeft = container.scrollWidth;
    }

    const callback = ([entry]: IntersectionObserverEntry[]) => {
      if (
        !entry.isIntersecting &&
        index &&
        wrapper.checkVisibility() &&
        container.checkVisibility()
      ) {
        onRemove?.(index.value, container, 'Swipe');
      }
    };
    const options = { root: container, threshold: 0.55 };
    const intersectObserver = new IntersectionObserver(callback, options);
    await elementAnimationsFinished(container);

    const timeout = setTimeout(() => intersectObserver.observe(wrapper), 1000);

    return () => {
      clearTimeout(timeout);
      intersectObserver.disconnect();
    };
  });

  const containProps = {
    ref: containerRef,
    class: [classes.container, containerClass, 'goal-card'],
    style: styles,
    'data-cancelable': cancelable,
  };

  const Content = () => (
    <div
      ref={wrapperRef}
      {...rest}
      class={[classes.scrollSnapWrapper, rest.class]}
    >
      <Icon
        name={icon}
        class={[classes.icon, classes.goalIcon]}
        color="white"
        secondaryColor={color}
        title="Icon related to the goal"
        inline
      />
      <h2 class={classes.title}>
        {title}
        {If(timeStamp, GoalTimeStamp)}
      </h2>
      <p class={classes.instruction}>{instruction}</p>
      {If(cancelable, () => (
        <button type="button" class={classes.cancelBtn} onClick={removeItem}>
          <InlinedIcon
            Icon={XIcon}
            class={classes.icon}
            color="white"
            secondaryColor={color}
            title="Remove Goal"
          />
        </button>
      ))}
    </div>
  );

  if (labelFor) {
    return (
      <label {...containProps} for={labelFor}>
        <Content />
      </label>
    );
  }

  return (
    <div {...containProps}>
      <Content />
    </div>
  );
}

function GoalTimeStamp(stamp: string) {
  const locale = navigator.languages[0];
  const options: Intl.DateTimeFormatOptions = {
    hour: '2-digit',
    minute: '2-digit',
  };
  const temporal = Temporal.PlainDateTime.from(stamp);
  const time = temporal.toLocaleString(locale, options);
  return (
    <>
      {' '}
      • <time class={classes.timeStamp}>{time}</time>
    </>
  );
}
