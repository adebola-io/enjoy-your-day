import { GoalItem } from '#/components/goal-item';
import { SearchInput } from '#/components/search-input';
import { Button } from '#/components/button';
import { GoalOption } from '#/components/goal-option';
import AddIcon from '#/components/icons/add';
import { DoubleCheckIcon } from '#/components/icons/double-check';
import { useObserver } from '#/library/useObserver';
import { setAutoSelectStage, setMetaTheme, vibrate } from '#/library/utils';
import type { GoalProps } from '#/data/entities';
import { Cell, type SourceCell } from '@adbl/cells';
import { For, If } from '@adbl/unfinished';
import { useRouter } from '@adbl/unfinished/router';
import classes from './auto-selection-edit.module.css';
import {
  getExampleGoalInstruction,
  getAutoCompleteSuggestions,
} from '#/data/db';

export interface GoalCardsViewProps {
  goals: SourceCell<GoalProps[]>;
}

export default function AutoSelectionEdit(props: GoalCardsViewProps) {
  const { goals } = props;
  const observer = useObserver();
  const router = useRouter();
  const route = router.getCurrentRoute();
  const containerRef = Cell.source<HTMLDivElement | null>(null);
  const ulRef = Cell.source<HTMLUListElement | null>(null);
  const activeItemIndex = Cell.source(0);
  const confirmDrawerHref = '/app/auto-select?stage=edit&confirm';
  const ulStyles = {
    '--total': Cell.derived(() => goals.value.length),
    '--active-item-index': Cell.derived(() => String(activeItemIndex.value)),
  };
  const searchIsOpen = Cell.derived(() => route.value.query.has('search'));

  const removeGoal = (index: number, item: Element, type: 'Swipe' | 'Tap') => {
    activeItemIndex.value = index;
    item.classList.add(classes[`deletingBy${type}`]);

    const eventHandler = () => {
      vibrate();
      goals.value.splice(index, 1);
    };
    const options = { once: true, capture: true };
    item.addEventListener('transitionend', eventHandler, options);
  };

  observer.onConnected(containerRef, () => {
    setMetaTheme('white');
    setAutoSelectStage(2);
  });

  return (
    <>
      <div ref={containerRef} class={classes.container}>
        <h1 class={classes.title}>Goals for Today</h1>
        <p class={classes.subtitle}>
          You can add new goals or ditch the ones you don't need to keep your
          priorities in check.
        </p>
        {If(searchIsOpen, {
          true: () => <SearchForm />,
          false: AddButton,
        })}
        <ul
          ref={ulRef}
          class={classes.goalItemList}
          inert={searchIsOpen}
          style={ulStyles}
        >
          {For(goals, (goal, index) => {
            return <GoalItem {...goal} index={index} onRemove={removeGoal} />;
          })}
        </ul>
        <router.Link
          class={classes.submitBtn}
          href={confirmDrawerHref}
          inert={searchIsOpen}
        >
          <DoubleCheckIcon class={classes.submitBtnIcon} title="Submit Goals" />
        </router.Link>
      </div>
    </>
  );
}

function AddButton() {
  const searchHref = '/app/auto-select?stage=edit&search';
  return (
    <Button class={classes.addBtn} href={searchHref} variant="primary" vibrate>
      <AddIcon class={classes.addBtnIcon} />
      Add a goal
    </Button>
  );
}

function SearchForm() {
  const router = useRouter();
  const placeholder = Cell.source('');
  const handleDismiss = () => {
    router.navigate('/app/auto-select?stage=edit');
  };

  getExampleGoalInstruction().then((example) => {
    placeholder.value = `e.g. ${example}`;
  });

  const selectGoal = () => {};

  return (
    <SearchInput
      class={classes.searchForm}
      containerClasses={classes.searchInputContainer}
      placeholder={placeholder}
      autoCompleteGetter={getAutoCompleteSuggestions}
      autoCompleteTemplate={GoalOption}
      onSubmit--prevent={selectGoal}
      onDismiss={handleDismiss}
      focused
    />
  );
}
