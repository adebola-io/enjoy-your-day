import { GoalCardProps } from '#/components/goal-card';
import { GoalItem } from '#/components/goal-item';
import { Button } from '#/components/button';
import { DoubleCheckIcon } from '#/components/icons/double-check';
import { useObserver } from '#/library/useObserver';
import { setAutoSelectionStage, setMetaThemeColor } from '#/library/utils';
import { Cell, type SourceCell } from '@adbl/cells';
import { For } from '@adbl/unfinished';
import { useRouter } from '@adbl/unfinished/router';
import classes from './auto-selection-edit.module.css';

export interface GoalCardsViewProps {
  goals: SourceCell<GoalCardProps[]>;
}

export default function AutoSelectionEdit(props: GoalCardsViewProps) {
  const { goals } = props;
  const ulRef = Cell.source<HTMLUListElement | null>(null);
  const observer = useObserver();
  const router = useRouter();

  const removeGoal = (
    index: number,
    container: HTMLElement,
    type: 'swipe' | 'tap'
  ) => {
    if (type === 'tap') {
      container.style.scale = '0.85';
    } else {
      const wrapper = container.firstElementChild as HTMLElement;
      wrapper.style.opacity = '0';
    }
    container.style.opacity = '0';

    const removeGoal = () => {
      goals.value.splice(index, 1);
    };
    container.addEventListener('transitionend', removeGoal, { once: true });
  };

  observer.onConnected(ulRef, () => {
    setMetaThemeColor('white');
    setAutoSelectionStage(2);
  });

  return (
    <>
      <div class={classes.container}>
        <h1 class={classes.title}>Goals for Today</h1>
        <p class={classes.subtitle}>
          You can add new goals or ditch the ones you don't need to keep your
          priorities in check.
        </p>
        <Button class={classes.addBtn} variant="primary" vibrate>
          Add a goal
        </Button>
        <ul ref={ulRef} class={classes.goalItemList}>
          {For(goals, (goal, index) => {
            return <GoalItem {...goal} index={index} onRemove={removeGoal} />;
          })}
        </ul>
        <router.Link
          class={classes.submitBtn}
          href="/app/auto-select?stage=2&confirm-drawer=true"
        >
          <DoubleCheckIcon class={classes.submitBtnIcon} title="Submit Goals" />
        </router.Link>
      </div>
    </>
  );
}
