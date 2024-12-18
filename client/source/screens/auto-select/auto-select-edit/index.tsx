import { GoalItem } from '#/components/goal-item';
import { SearchInput } from '#/components/search-input';
import { Container } from '#/components/container';
import { GoalOption, type GoalOptionProps } from '#/components/goal-option';
import AddIcon from '#/components/icons/add';
import { InlinedIcon } from '#/components/inlined-icon';
import { DoubleCheckIcon } from '#/components/icons/double-check';
import { useObserver } from '#/library/useObserver';
import { setAutoSelectStage, setMetaTheme, vibrate } from '#/library/utils';
import type { GoalProps } from '#/data/entities';
import { Cell, type SourceCell } from '@adbl/cells';
import { For, If } from '@adbl/unfinished';
import { useRouter } from '@adbl/unfinished/router';
import {
  getExampleGoalInstruction,
  getAutoCompleteSuggestions,
} from '#/data/db';
import { CSS_VARS } from '#/styles/variables';
import classes from './auto-selection-edit.module.css';

export interface GoalCardsViewProps {
  goals: SourceCell<GoalProps[]>;
}

export default function AutoSelectionEdit(props: GoalCardsViewProps) {
  const { goals } = props;
  const observer = useObserver();
  const router = useRouter();
  const route = router.getCurrentRoute();
  const containerRef = Cell.source<HTMLDivElement | null>(null);
  const placeholder = Cell.source('');
  const activeItemIndex = Cell.source(0);
  const searchIsOpen = Cell.derived(() => route.value.query.has('search'));
  const baseHref = '/home?auto-select&stage=edit';
  const searchHref = `${baseHref}&search`;
  const confirmDrawerHref = `${baseHref}&confirm`;
  const ulStyles = {
    '--total': Cell.derived(() => goals.value.length),
    '--active-item-index': Cell.derived(() => String(activeItemIndex.value)),
  };

  const openSearch = () => {
    if (searchIsOpen.value) return;
    router.navigate(searchHref);
  };
  const closeSearch = () => {
    if (!searchIsOpen.value) return;
    return router.navigate(baseHref);
  };

  const addGoal = async (goal: GoalOptionProps) => {
    await closeSearch();
    activeItemIndex.value = 0;
    props.goals.value.splice(0, 0, goal);
  };

  const removeGoal = (index: number, item: Element, mode: 'Swipe' | 'Tap') => {
    activeItemIndex.value = index;
    item.classList.add(classes[`deletingBy${mode}`]);
    vibrate();
    goals.value.splice(index, 1);
  };

  observer.onConnected(containerRef, () => {
    setMetaTheme('white');
    setAutoSelectStage(2);

    getExampleGoalInstruction().then((example) => {
      placeholder.value = `e.g. ${example}`;
    });
  });

  return (
    <>
      <div
        ref={containerRef}
        class={classes.container}
        data-search-is-open={searchIsOpen}
      >
        <h1 class={classes.title}>Goals for Today</h1>
        <p class={classes.subtitle}>
          You can add new goals or ditch the ones you don't need to keep your
          priorities in check.
        </p>
        <Container
          class={classes.buttonAndSearchContainer}
          onClick={openSearch}
        >
          {If(searchIsOpen, {
            true: () => (
              <SearchInput
                class={classes.searchForm}
                containerClasses={classes.searchInputContainer}
                autoCompleteClasses={classes.autoComplete}
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
                  class={classes.buttonAndSearchContainerIcon}
                  color={CSS_VARS['--space-cadet-500']}
                  title="Add Icon"
                />
                Add a goal
              </>
            ),
          })}
        </Container>
        <ul class={classes.goalItemList} inert={searchIsOpen} style={ulStyles}>
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
