import { Button } from '#/components/button';
import { GoalCard } from '#/components/goal-card';
import type { GoalProps } from '#/data/entities';
import AutoSelectionEdit from '../auto-selection-edit';
import { useObserver } from '#/library/useObserver';
import { Cell, type SourceCell } from '@adbl/cells';
import { For, Switch } from '@adbl/unfinished';
import { useRouter } from '@adbl/unfinished/router';
import classes from './recommended-goals.module.css';
import { initScrollTimeline, setAutoSelectStage } from '#/library/utils';

export interface RecommendedGoalsProps {
  goals: SourceCell<GoalProps[] | null>;
}

type AutoSelectStage = 'start' | 'edit';

export default async function RecommendedGoals(props: RecommendedGoalsProps) {
  if (!props.goals.value) return undefined;
  const goals = props.goals as SourceCell<GoalProps[]>;
  const router = useRouter();
  const route = router.getCurrentRoute();
  const currentStage = Cell.derived(() => {
    return (route.value.query.get('stage') as AutoSelectStage) ?? 'start';
  });

  return Switch(currentStage, {
    start: () => <GoalCardList goals={goals} />,
    edit: () => <AutoSelectionEdit goals={goals} />,
  });
}

interface GoalCardsViewProps {
  goals: SourceCell<GoalProps[]>;
}

function GoalCardList(props: GoalCardsViewProps) {
  const ulRef = Cell.source<HTMLUListElement | null>(null);
  const { goals } = props;
  const observer = useObserver();
  const ulStyles = { '--total': goals.value.length };
  const confirmDrawerHref = '/app/auto-select?confirm';
  const editStageHref = '/app/auto-select?stage=edit';

  observer.onConnected(ulRef, (ul) => {
    setAutoSelectStage(1);
    ul.scrollTop = ul.scrollHeight;
    if (initScrollTimeline(ul)) return () => ul.getAnimations().at(0)?.finish();
  });

  return (
    <>
      <ul ref={ulRef} class={classes.goalCards} style={ulStyles}>
        {For(goals, (goal, index) => {
          return <GoalCard {...goal} index={index} />;
        })}
      </ul>
      <div class={classes.buttonRow}>
        <Button class={classes.btn} href={confirmDrawerHref} vibrate>
          Perfect
        </Button>
        <Button class={classes.btn} href={editStageHref} vibrate>
          Edit
        </Button>
      </div>
    </>
  );
}
