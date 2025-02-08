import { ImmersiveView } from '#/components/immersive-view';
import { Input } from '#/components/input';
import { useRouteQuery } from '#/library/utils';
import { Cell } from '@adbl/cells';

import classes from './extra-goals.module.css';
import {
  getAutoCompleteSuggestions,
  getExampleGoalInstruction,
} from '#/services/database';
import { For, useObserver } from '@adbl/unfinished';
import { dailyGoals, selectedCategories } from '#/data/state';
import type { GoalProps } from '#/data/entities';
import { Icon } from '#/components/icon';

export const extraGoalsPageQuery = 'extra-goals-query';
export default function ExtraGoalsView() {
  return (
    <ImmersiveView
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
  const selectedGoalsUuids = Cell.derived(() =>
    dailyGoals.value.map((g) => g.goal.uuid)
  );
  const autoCompleteOptions = Cell.source<GoalProps[]>([]);

  observer.onConnected(inputRef, async (input) => {
    input.focus();
    const selectedGoals = selectedGoalsUuids.value;
    const categories = selectedCategories.value;
    const example = await getExampleGoalInstruction(selectedGoals, categories);
    exampleGoal.value = `e.g. ${example}`;
  });

  searchQuery.listen(async (query) => {
    const options = await getAutoCompleteSuggestions(
      query,
      selectedGoalsUuids.value,
      7
    );
    autoCompleteOptions.value = options;
  });

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
      />
      <ul class={classes.autoComplete}>
        {For(autoCompleteOptions, (option) => (
          <li class={classes.autoCompleteItem}>
            <button class={classes.autoCompleteItemButton} type="button">
              <Icon name={option.icon} class={classes.autoCompleteItemIcon} />
              <span class={classes.autoCompleteItemText}>
                {option.instruction.toLowerCase()}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}
