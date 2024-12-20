import type { IconName } from '#/library/icon-name';
import { useObserver } from '#/library/useObserver';
import { InlinedIcon } from '#/components/inlined-icon';
import { If } from '@adbl/unfinished';
import { Cell } from '@adbl/cells';
import { Icon } from '../icon';
import { XIcon } from '#/components/icons/x';
import classes from './goal-item.module.css';

export interface GoalItemProps {
  title: string;
  icon: IconName;
  index?: Cell<number>;
  color: string;
  instruction: string;
  onRemove?: (
    item: number,
    container: HTMLElement,
    type: 'Swipe' | 'Tap'
  ) => void;
  cancelable?: boolean;
}

export function GoalItem(props: GoalItemProps) {
  const containerRef = Cell.source<HTMLElement | null>(null);
  const wrapperRef = Cell.source<HTMLElement | null>(null);
  const observer = useObserver();
  const { cancelable = true } = props;
  const styles = {
    '--level': props.index,
    '--bg-color': props.color,
  };

  const removeItem = () => {
    if (!containerRef.value || !props.index) return;
    props.onRemove?.(props.index.value, containerRef.value, 'Tap');
  };

  observer.onConnected(wrapperRef, () => {
    // Intersection Observer doesn't work on cell values directly
    // because they are proxies.
    const wrapper = wrapperRef.deproxy();
    const container = containerRef.deproxy();

    const callback = ([entry]: IntersectionObserverEntry[]) => {
      if (!entry.isIntersecting && container.checkVisibility() && props.index) {
        props.onRemove?.(props.index.value, container, 'Swipe');
      }
    };
    const options = { root: container, threshold: 0.55 };
    const intersectObserver = new IntersectionObserver(callback, options);
    intersectObserver.observe(wrapper);
    return () => intersectObserver.disconnect();
  });

  return (
    <li
      ref={containerRef}
      class={[classes.container, 'goal-card']}
      style={styles}
      data-cancelable={cancelable}
    >
      <div ref={wrapperRef} class={classes.scrollSnapWrapper}>
        <Icon
          name={props.icon}
          class={[classes.icon, classes.goalIcon]}
          color="white"
          title="Icon related to the goal"
          inline
        />
        <h2 class={classes.title}>{props.title}</h2>
        <p class={classes.instruction}>{props.instruction}</p>
        {If(cancelable, () => (
          <button type="button" class={classes.cancelBtn} onClick={removeItem}>
            <InlinedIcon
              Icon={XIcon}
              class={classes.icon}
              color="white"
              title="Remove Goal"
            />
          </button>
        ))}
      </div>
    </li>
  );
}
