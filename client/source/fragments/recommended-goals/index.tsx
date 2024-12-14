import { Button } from '#/components/button';
import { GoalCard, type GoalCardProps } from '#/components/goal-card';
import { vibrate } from '#/library/utils';
import { useObserver } from '#/library/useObserver';
import { Cell } from '@adbl/cells';
import { For } from '@adbl/unfinished';
import classes from './recommended-goals.module.css';

export interface RecommendedGoalsProps {
  goals: GoalCardProps[] | null;
}

export default function RecommendedGoals(props: RecommendedGoalsProps) {
  if (!props.goals) return;

  const { goals } = props;
  const observer = useObserver();
  const list = Cell.source<HTMLUListElement | null>(null);

  observer.onConnected(list, (list) => {
    vibrate();
    // Make sure the list is scrolled to the bottom.
    list.scrollTop = list.scrollHeight;

    // For Safari and Firefox
    if ('ScrollTimeline' in window) return;
    list.classList.add(classes.fallback);
    const animation = list.getAnimations().at(0);
    if (!animation) return;
    list.onscroll = () => {
      animation.currentTime = (list.scrollTop / list.scrollHeight) * 150;
    };

    return () => animation.finish();
  });

  return (
    <>
      <ul
        ref={list}
        class={classes.goalCards}
        style={{ '--total': goals.length }}
      >
        {For(goals, (goal, index) => {
          return <GoalCard {...goal} index={index} />;
        })}
      </ul>
      <Button class={classes.continueButton} vibrateOnClick>
        Continue
      </Button>
    </>
  );
}
