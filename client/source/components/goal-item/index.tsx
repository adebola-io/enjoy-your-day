import { IconName } from '#/library/icon-name';
import { useObserver } from '#/library/useObserver';
import { Cell } from '@adbl/cells';
import { Icon } from '../icon';
import { XIcon } from '#/components/icons/x';
import classes from './goal-item.module.css';

export interface GoalItemProps {
  title: string;
  icon: IconName;
  index: Cell<number>;
  color: string;
  instruction: string;
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
  const styles = {
    '--level': props.index,
    '--bg-color': props.color,
    viewTransitionName: Cell.derived(() => `goal-card-${props.index.value}`),
    viewTransitionClass: 'goal-card',
  };

  const removeItem = () => {
    if (!containerRef.value) return;
    props.onRemove?.(props.index.value, containerRef.value, 'Tap');
  };

  observer.onConnected(wrapperRef, () => {
    // Intersection Observer doesn't work on cell values directly
    // because they are proxies.
    const wrapper = wrapperRef.deproxy();
    const container = containerRef.deproxy();

    const callback = ([entry]: IntersectionObserverEntry[]) => {
      if (!entry.isIntersecting && container.checkVisibility()) {
        props.onRemove?.(props.index.value, container, 'Swipe');
      }
    };
    const intersectOptions = { root: container, threshold: 0.55 };
    const intersectObserver = new IntersectionObserver(
      callback,
      intersectOptions
    );
    intersectObserver.observe(wrapper);

    return () => intersectObserver.disconnect();
  });

  return (
    <li
      ref={containerRef}
      class={[classes.container, 'goal-card']}
      style={styles}
    >
      <div ref={wrapperRef} class={classes.scrollSnapWrapper}>
        <Icon name={props.icon} class={classes.icon} />
        <div class={classes.details}>
          <h2 class={classes.title}>{props.title}</h2>
          <p class={classes.instruction}>{props.instruction}</p>
        </div>
        <button class={classes.cancelBtn} onClick={removeItem}>
          <XIcon class={classes.icon} title="Remove Goal" />
        </button>
      </div>
    </li>
  );
}
