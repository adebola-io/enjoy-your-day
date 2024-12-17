import { GoalItem } from '#/components/goal-item';
import { SearchInput } from '#/components/search-input';
import { Container } from '#/components/container';
import { GoalOption, type GoalOptionProps } from '#/components/goal-option';
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
import { InlinedIcon } from '#/components/inlined-icon';
import { CSS_VARS } from '#/styles/variables';

export interface GoalCardsViewProps {
  goals: SourceCell<GoalProps[]>;
}

export default function AutoSelectionEdit(props: GoalCardsViewProps) {
  const { goals } = props;
  const observer = useObserver();
  const router = useRouter();
  const route = router.getCurrentRoute();
  const containerRef = Cell.source<HTMLDivElement | null>(null);
  const headingRef = Cell.source<HTMLHeadingElement | null>(null);
  const ulRef = Cell.source<HTMLUListElement | null>(null);
  const placeholder = Cell.source('');
  const activeItemIndex = Cell.source(0);
  const searchIsOpen = Cell.derived(() => route.value.query.has('search'));
  const confirmDrawerHref = '/app/auto-select?stage=edit&confirm';
  const ulStyles = {
    '--total': Cell.derived(() => goals.value.length),
    '--active-item-index': Cell.derived(() => String(activeItemIndex.value)),
  };

  getExampleGoalInstruction().then((example) => {
    placeholder.value = `e.g. ${example}`;
  });

  const addGoal = async (goal: GoalOptionProps) => {
    await closeSearch();
    props.goals.value.splice(0, 0, goal);
  };

  const openSearch = () => {
    if (searchIsOpen.value) return;
    router.navigate('/app/auto-select?stage=edit&search');
  };
  const closeSearch = () => {
    return router.navigate('/app/auto-select?stage=edit');
  };

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
      <div
        ref={containerRef}
        class={classes.container}
        data-search={searchIsOpen}
      >
        <h1 ref={headingRef} class={classes.title}>
          Goals for Today
        </h1>
        <p class={classes.subtitle}>
          You can add new goals or ditch the ones you don't need to keep your
          priorities in check.
        </p>
        <Container class={classes.addBtn} onClick={openSearch}>
          {If(searchIsOpen, {
            true: () => (
              <SearchInput
                class={classes.searchForm}
                containerClasses={classes.searchInputContainer}
                placeholder={placeholder}
                autoCompleteGetter={getAutoCompleteSuggestions}
                AutoCompleteTemplate={GoalOption}
                onAutoCompleteSelect={addGoal}
                onSubmit--prevent={closeSearch}
                onDismiss={closeSearch}
                focused
              />
            ),
            false: () => (
              <>
                <InlinedIcon
                  Icon={AddIcon}
                  class={classes.addBtnIcon}
                  color={CSS_VARS['--space-cadet-500']}
                  title="Add Icon"
                />
                Add a goal
              </>
            ),
          })}
        </Container>
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
          <InlinedIcon
            Icon={DoubleCheckIcon}
            class={classes.submitBtnIcon}
            title="Submit Goals"
            color="white"
          />
        </router.Link>
      </div>
    </>
  );
}
