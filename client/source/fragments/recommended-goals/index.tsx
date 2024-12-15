import { Button } from '#/components/button';
import { GoalCard, type GoalCardProps } from '#/components/goal-card';
import AutoSelectionEdit from '../auto-selection-edit';
import { useObserver } from '#/library/useObserver';
import { Cell, type SourceCell } from '@adbl/cells';
import { For, Switch } from '@adbl/unfinished';
import { useRouter } from '@adbl/unfinished/router';
import classes from './recommended-goals.module.css';
import { setAutoSelectionStage } from '#/library/utils';

export interface RecommendedGoalsProps {
  goals: SourceCell<GoalCardProps[] | null>;
}

export default async function RecommendedGoals(props: RecommendedGoalsProps) {
  if (!props.goals.value) return undefined;
  const goals = props.goals as SourceCell<GoalCardProps[]>;
  const router = useRouter();
  const currentRoute = router.getCurrentRoute();
  const currentStage = Cell.derived(() => {
    return Number(currentRoute.value.query.get('stage') ?? 1);
  });

  if (currentStage.value !== 1) {
    // Ensures that routing always starts on the first stage.
    return void (await router.replace('/app/auto-select'));
  }

  return Switch(currentStage, {
    1: () => <GoalCardList goals={goals} />,
    2: () => <AutoSelectionEdit goals={goals} />,
  });
}

interface GoalCardsViewProps {
  goals: SourceCell<GoalCardProps[]>;
}

function GoalCardList(props: GoalCardsViewProps) {
  const ulRef = Cell.source<HTMLUListElement | null>(null);
  const { goals } = props;
  const observer = useObserver();
  const ulStyles = { '--total': goals.value.length };

  observer.onConnected(ulRef, (ul) => {
    setAutoSelectionStage(1);
    // Forces the card scroll go from bottom -> up.
    ul.scrollTop = ul.scrollHeight;
    // Fallback listener to advance the scroll timeline:
    if ('ScrollTimeline' in window) return;
    ul.classList.add(classes.fallback);
    ul.onscroll = () => {
      const animation = ul.getAnimations().at(0);
      const newTime = (ul.scrollTop / ul.scrollHeight) * 100;
      if (animation) animation.currentTime = newTime;
    };
    return () => ul.getAnimations().at(0)?.finish();
  });

  return (
    <>
      <ul ref={ulRef} class={classes.goalCards} style={ulStyles}>
        {For(goals, (goal, index) => {
          return <GoalCard {...goal} index={index} />;
        })}
      </ul>
      <div class={classes.buttonRow}>
        <Button
          class={classes.btn}
          href="/app/auto-select?confirm-drawer"
          vibrate
        >
          Perfect
        </Button>
        <Button class={classes.btn} href="/app/auto-select?stage=2" vibrate>
          Edit
        </Button>
      </div>
    </>
  );
}
