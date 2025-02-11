import { ImmersiveView } from '#/components/immersive-view';
import { Input } from '#/components/input';
import {
  addRouteQuery,
  removeRouteQuery,
  useRouteQuery,
} from '#/library/utils';
import { Cell } from '@adbl/cells';
import {
  getAutoCompleteSuggestions,
  getExampleGoalInstruction,
} from '#/services/database';
import { dailyGoals, selectedCategories } from '#/data/state';
import type { GoalProps } from '#/data/entities';
import { Icon } from '#/components/icon';
import AddGoalDrawer, { drawerQuery } from './add-goal-drawer';
import { useObserver } from '@adbl/unfinished';
import { isSafari } from '#/library/app-environment';
import { FluidList } from '#/components/fluid-list';
import classes from './extra-goals.module.css';

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

  const close = async () => {
    await removeRouteQuery(extraGoalsPageQuery);
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

  const AutoCompleteOption = (option: GoalProps) => {
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
        Template={(props) => (
          <AutoCompleteOption {...props.item} index={props.index} />
        )}
      />
      <AddGoalDrawer onBeforeGoalAdded={close} />
    </>
  );
}
