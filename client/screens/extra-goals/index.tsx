import { ImmersiveView } from '#/components/immersive-view';
import { Input } from '#/components/input';
import { Cell } from '@adbl/cells';
import {
  getAutoCompleteSuggestions,
  getExampleGoalInstruction,
} from '#/services/database';
import { dailyGoals, selectedCategories } from '#/data/state';
import type {
  GoalProps,
  GoalPropsSerialized,
  GoalStateSerialized,
} from '#/data/entities';
import { Icon } from '#/components/icon';
import GoalDetailsDrawer, { drawerQuery } from './goal-details';
import { useObserver } from '@adbl/unfinished';
import { isSafari } from '#/library/app-environment';
import {
  FluidList,
  type ListTemplateProps,
} from '@adbl/iota/components/fluid-list';
import { Button } from '#/components/button';
import classes from './extra-goals.module.css';
import {
  addRouteQuery,
  removeRouteQuery,
  useRouteQuery,
} from '@adbl/iota/utils/router';

export const extraGoalsPageQuery = 'extra-goals-query';
export default function ExtraGoalsView() {
  return (
    <ImmersiveView
      id="extraGoalsView"
      class={classes.container}
      open={useRouteQuery(extraGoalsPageQuery)}
      content={ExtraGoalsViewContent}
      data-stagger-children
    />
  );
}

function ExtraGoalsViewContent() {
  const observer = useObserver();
  const inputRef = Cell.source<HTMLInputElement | null>(null);
  const searchQuery = Cell.source('');
  const exampleGoal = Cell.source('');
  const autoCompleteOptions = Cell.source<GoalProps[]>([]);
  const selectedGoalsUuids = Cell.derived(() =>
    dailyGoals.value.map((g) => g.goal.uuid)
  );

  const addGoal = async (goal: GoalPropsSerialized) => {
    removeRouteQuery(drawerQuery);
    await new Promise((r) => setTimeout(r, 200));
    await removeRouteQuery(extraGoalsPageQuery);
    await new Promise((r) => setTimeout(r, 200));
    const dateAdded = new Date(goal.dateAdded).toISOString();
    const goalState: GoalStateSerialized = {
      state: 'scheduled',
      goal: { ...goal, dateAdded },
      updatedAt: null,
    };
    dailyGoals.value.push(goalState);
  };

  observer.onConnected(inputRef, async (input) => {
    input.focus();
    const selectedGoals = selectedGoalsUuids.value;
    const categories = selectedCategories.value;
    const example = await getExampleGoalInstruction(selectedGoals, categories);
    exampleGoal.value = `e.g. ${example}`;
  });

  searchQuery.listen(async (query) => {
    const uuids = selectedGoalsUuids.value;
    const options = await getAutoCompleteSuggestions(query, uuids, 7);
    autoCompleteOptions.value = options;
  });

  const handleInputBlur = async (event: FocusEvent) => {
    // TODO: For some reason, Safari's relatedTarget is always null.
    if (isSafari() && searchQuery.value.length) return;
    if (event.relatedTarget instanceof HTMLButtonElement) return;
    if (event.relatedTarget instanceof HTMLLIElement) return;
    await removeRouteQuery(extraGoalsPageQuery);
  };

  const AutoCompleteOption = (props: ListTemplateProps<GoalProps>) => {
    const option = props.item;
    const openGoalCard = async () => {
      await removeRouteQuery(drawerQuery);
      addRouteQuery(drawerQuery, option.uuid);
    };
    return (
      <li class={classes.autoCompleteItem}>
        <button
          class={classes.autoCompleteItemButton}
          type="button"
          onClick={openGoalCard}
        >
          <div class={classes.autoCompleteItemIconContainer}>
            <Icon name={option.icon} class={classes.autoCompleteItemIcon} />
          </div>
          <span class={classes.autoCompleteItemText}>
            {option.instruction.toLowerCase()}
          </span>
        </button>
      </li>
    );
  };

  const GoalDetailsDrawerButtons = (goal: GoalPropsSerialized) => (
    <>
      <Button
        rounded
        variant="outlined"
        class={classes.closeBtn}
        onClick={() => removeRouteQuery(drawerQuery)}
      >
        Close
      </Button>
      <Button rounded class={classes.addBtn} onClick={() => addGoal(goal)}>
        Add
      </Button>
    </>
  );

  return (
    <>
      <h2 class={classes.heading}>Add a new goal.</h2>
      <Input
        ref={inputRef}
        class={classes.input}
        model={searchQuery}
        type="search"
        placeholder={exampleGoal}
        rounded
        onBlur={handleInputBlur}
      />
      <FluidList
        items={autoCompleteOptions}
        itemKey="uuid"
        itemWidth="100dvw"
        speed="calc(var(--default-duration) * 2)"
        Template={AutoCompleteOption}
      />
      <GoalDetailsDrawer
        shrinkTarget="#extraGoalsView"
        buttons={GoalDetailsDrawerButtons}
      />
    </>
  );
}
