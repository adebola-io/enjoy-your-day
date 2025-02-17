import { GoalItem } from '#/components/goal-item';
import { SearchInput } from '#/components/search-input';
import { Container } from '#/components/container';
import { ElasticArea } from '#/components/elastic-area';
import { BackButton } from '#/components/back-button';
import { StackLayerView } from '#/components/stack-layer-view';
import { GoalOption, type GoalOptionProps } from '#/components/goal-option';
import { AddIcon } from '#/components/icons/add';
import { InlinedIcon } from '#/components/inlined-icon';
import { DoubleCheckIcon } from '#/components/icons/double-check';
import { selectedCategories } from '#/data/state';
import {
  addRouteQuery,
  removeRouteQuery,
  useRouteQuery,
  vibrate,
} from '#/library/utils';
import type { GoalProps } from '#/data/entities';
import { Cell, type SourceCell } from '@adbl/cells';
import { If, useObserver } from '@adbl/unfinished';
import {
  getExampleGoalInstruction,
  getAutoCompleteSuggestions,
} from '#/services/database';
import classes from './auto-select-edit-layer.module.css';
import { FloatingActionButton } from '#/components/floating-action-button';
import { FluidList } from '#/components/fluid-list';

export interface GoalCardsViewProps {
  goals: SourceCell<GoalProps[] | null>;
}

export default function AutoSelectEditLayer(props: GoalCardsViewProps) {
  const goals = props.goals as SourceCell<GoalProps[]>;
  const observer = useObserver();
  const searchIsOpen = useRouteQuery('search');
  const editIsOpen = useRouteQuery('stage', 'edit');
  const containerRef = Cell.source<HTMLDivElement | null>(null);
  const ulRef = Cell.source<HTMLUListElement | null>(null);
  const placeholder = Cell.source('');
  const isEmpty = Cell.derived(() => goals.value.length === 0);
  const goalUuids = Cell.derived(() => goals.value.map((g) => g.uuid));
  const btnDisabled = Cell.derived(() => isEmpty.value || searchIsOpen.value);

  const openSearch = async () => {
    if (!searchIsOpen.value) {
      await addRouteQuery('search');
    }
  };

  const closeSearch = async () => {
    if (searchIsOpen.value) await removeRouteQuery('search');
  };

  const updatePlaceholder = async () => {
    const uuids = goalUuids.value;
    const categories = selectedCategories.value;
    const example = await getExampleGoalInstruction(uuids, categories);
    placeholder.value = `e.g. ${example}`;
  };

  const autoComplete = (query: string) => {
    return getAutoCompleteSuggestions(query, goalUuids.value);
  };

  const addGoal = async (goal: GoalOptionProps) => {
    await closeSearch();
    goals.value.splice(0, 0, goal);
    updatePlaceholder();
  };

  const removeGoal = (index: number) => {
    vibrate();
    goals.value.splice(index, 1);
  };

  const handleSubmit = () => {
    vibrate();
    addRouteQuery('confirm');
  };

  const ContainerButtonContent = () => (
    <div class={classes.containerButtonContent}>
      <AddIcon class={classes.buttonAndSearchContainerIcon} />
      Add a goal
    </div>
  );

  const SearchInputContent = () => (
    <SearchInput
      class={classes.searchForm}
      containerClasses={classes.searchInputContainer}
      autoCompleteClasses={classes.autoComplete}
      placeholder={placeholder}
      autoCompleteGetter={autoComplete}
      AutoCompleteTemplate={GoalOption}
      onAutoCompleteSelect={addGoal}
      onSubmit--prevent={closeSearch}
      onDismiss={closeSearch}
      focused
    />
  );

  observer.onConnected(containerRef, updatePlaceholder);

  return (
    <StackLayerView
      class={classes.viewLayer}
      open={useRouteQuery('stage', 'edit')}
      content={() => (
        <ElasticArea
          id="autoSelectEdit"
          yAxis
          ref={containerRef}
          class={classes.container}
          data-is-open={editIsOpen}
          data-no-goals-added={isEmpty}
          data-search-is-open={searchIsOpen}
        >
          <BackButton class={classes.backButton} />
          <h1 class={classes.title}>Goals for Today</h1>
          <p class={classes.subtitle}>
            Shape a day that works best for you by adding goals and adjusting
            priorities.
          </p>
          <Container
            class={classes.buttonAndSearchContainer}
            onClick={openSearch}
          >
            {If(searchIsOpen, {
              true: SearchInputContent,
              false: ContainerButtonContent,
            })}
          </Container>
          <div class={classes.goalItemListContainer}>
            <FluidList
              ref={ulRef}
              class={classes.goalItemList}
              inert={searchIsOpen}
              items={goals}
              itemWidth="100dvw"
              itemHeight="var(--goal-card-suggestive-size)"
              itemKey="uuid"
              speed="calc(var(--default-duration) * 2)"
              gap="5px"
              staggeredDelay="calc(var(--default-duration) * 0.25)"
              Template={(props) => (
                <GoalItem
                  containerClass={classes.goalItem}
                  {...props.item}
                  index={props.index}
                  onRemove={removeGoal}
                />
              )}
            />
          </div>
          <FloatingActionButton
            class={classes.submitBtn}
            avoidNavbar={false}
            block="end"
            inline="end"
            disabled={btnDisabled}
            onClick={handleSubmit}
          >
            <InlinedIcon
              Icon={DoubleCheckIcon}
              class={classes.submitBtnIcon}
              title="Submit Goals"
              color="white"
            />
          </FloatingActionButton>
        </ElasticArea>
      )}
    />
  );
}
