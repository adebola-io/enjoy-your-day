import { dexie } from './dexie';
import type { Db } from './types';
import { startGoalUpdateProcess, updateDataQueue } from './update';
import { shuffleArray } from './utils';
import type { GoalProps } from '#/data/entities';
import { Temporal } from 'temporal-polyfill';

type GenerateGoalsForTodayHandler = Db.Handler<Db.Requests.GetRecommendedGoals>;
type AutoCompleteGoalsHandler =
  Db.Handler<Db.Requests.GetAutoCompleteSuggestions>;
type RecordGoalsHandler = Db.Handler<Db.Requests.RecordGoalState>;
type GetSearchExampleHandler =
  Db.Handler<Db.Requests.GetExampleSearchGoalInstruction>;
type UpdateGoalsListHandler = Db.Handler<Db.Requests.UpdateGoals>;

export const recommendGoals: GenerateGoalsForTodayHandler = async (data) => {
  const { categories: categoriesArray, preferredInvolvementLevel } =
    data.message;
  const categories = new Set(categoriesArray);

  const today = Temporal.Now.plainDateISO();
  const oneWeekAgo = today.subtract({ days: 7 }).toString();
  const pastWeekRecords = await dexie.history
    .where('date')
    .between(oneWeekAgo, today.toString(), true, true)
    .toArray();

  const completedGoalUuidsFromYesterday = new Set();
  const unfinishedGoalUuidsFromYesterday = new Set();

  for (const record of pastWeekRecords) {
    for (const goalState of record.goalStates) {
      if (goalState.state === 'completed') {
        completedGoalUuidsFromYesterday.add(goalState.goal.uuid);
      } else {
        unfinishedGoalUuidsFromYesterday.add(goalState.goal.uuid);
      }
    }
  }

  const goals = shuffleArray(await dexie.goals.toArray());

  const finalResults: GoalProps[] = [];

  const preferredInvolvementLevelTier1: GoalProps[] = [];
  const preferredInvolvementLevelTier2: GoalProps[] = [];
  const preferredInvolvementLevelTier3: GoalProps[] = [];

  const unfinishedGoalsFromYesterday: GoalProps[] = [];
  const completedGoalsFromYesterday: GoalProps[] = [];

  const categoryMatchTier1: GoalProps[] = [];
  const categoryMatchTier2: GoalProps[] = [];
  const categoryMatchTier3: GoalProps[] = [];
  const categoryMatchTier4: GoalProps[] = [];

  for (let i = 0; i < goals.length; i++) {
    const goal = goals[i];

    if (completedGoalUuidsFromYesterday.has(goal.uuid)) {
      completedGoalsFromYesterday.push(goal);
      continue;
    }
    if (unfinishedGoalUuidsFromYesterday.has(goal.uuid)) {
      unfinishedGoalsFromYesterday.push(goal);
      continue;
    }

    let categoryMatchToGoal = 0;
    let categoryMatchToUser = 0;
    for (const category of goal.categories) {
      if (categories.has(category)) {
        categoryMatchToGoal++;
      }
    }

    for (const category of categories) {
      if (goal.categories.has(category)) {
        categoryMatchToUser++;
      }
    }

    const categoryMatchRatio =
      (categoryMatchToGoal / goal.categories.size +
        categoryMatchToUser / categories.size) /
      2;

    if (categoryMatchRatio > 0.95) {
      if (goal.involvement === preferredInvolvementLevel) {
        preferredInvolvementLevelTier1.push(goal);
      } else {
        categoryMatchTier1.push(goal);
      }
    } else if (categoryMatchRatio > 0.5) {
      if (goal.involvement === preferredInvolvementLevel) {
        preferredInvolvementLevelTier2.push(goal);
      } else {
        categoryMatchTier2.push(goal);
      }
    } else if (categoryMatchRatio > 0.25) {
      if (goal.involvement === preferredInvolvementLevel) {
        preferredInvolvementLevelTier3.push(goal);
      } else {
        categoryMatchTier3.push(goal);
      }
    } else {
      categoryMatchTier4.push(goal);
    }
  }

  finalResults.push(...preferredInvolvementLevelTier1.slice(0, 6));

  if (finalResults.length < 6) {
    finalResults.push(...unfinishedGoalsFromYesterday.slice(0, 6));
  }

  if (finalResults.length < 6) {
    finalResults.push(...preferredInvolvementLevelTier2.slice(0, 6));
  }

  if (finalResults.length < 6) {
    finalResults.push(...categoryMatchTier1.slice(0, 6));
  }

  if (finalResults.length < 6) {
    finalResults.push(...preferredInvolvementLevelTier3.slice(0, 6));
  }

  if (finalResults.length < 6) {
    finalResults.push(...categoryMatchTier2.slice(0, 6));
  }

  if (finalResults.length < 6) {
    finalResults.push(...categoryMatchTier3.slice(0, 6));
  }

  if (finalResults.length < 6) {
    finalResults.push(...categoryMatchTier4.slice(0, 6));
  }

  if (finalResults.length < 6) {
    finalResults.push(...completedGoalsFromYesterday);
  }

  return finalResults.slice(0, 6);
};

const segmenter = new Intl.Segmenter('en-US', { granularity: 'word' });
const segment = (input: string) => {
  return [...segmenter.segment(input)]
    .filter((segment) => segment.isWordLike)
    .map((s) => s.segment);
};

export const autoCompleteGoals: AutoCompleteGoalsHandler = async (data) => {
  const { query, addedUuids } = data.message;
  const goals = await dexie.goals.toArray();

  const queryLower = query.trim().toLowerCase();
  const queryWords = segment(queryLower);

  const patternMatchResults = [];
  const instructionWordsMatchResults = [];
  const titleWordsMatchResults = [];

  for (const goal of goals) {
    if (addedUuids.includes(goal.uuid)) continue;

    const goalTitleLower = goal.title.toLowerCase();
    const goalInstructionLower = goal.instruction.toLowerCase();

    const hasPatternMatch =
      goalTitleLower.includes(queryLower) ||
      goalInstructionLower.includes(queryLower) ||
      goal.categories.has(queryLower);

    if (hasPatternMatch) {
      patternMatchResults.push(goal);
      if (patternMatchResults.length === 5) break;
      continue;
    }

    const instructionWords = segment(goalInstructionLower);
    const hasInstructionWordMatch = queryWords.every((word) =>
      instructionWords.some((iWord) => iWord.includes(word))
    );
    if (hasInstructionWordMatch) {
      instructionWordsMatchResults.push(goal);
      if (instructionWordsMatchResults.length === 5) break;
      continue;
    }

    const titleWords = segment(goalTitleLower);
    const hasTitleWordsMatch = queryWords.every((word) =>
      titleWords.some((tWord) => tWord.includes(word))
    );
    if (hasTitleWordsMatch) {
      titleWordsMatchResults.push(goal);
      if (titleWordsMatchResults.length === 5) break;
    }
  }

  const finalResults = [
    ...patternMatchResults,
    ...instructionWordsMatchResults,
    ...titleWordsMatchResults,
  ].slice(0, 5);

  return finalResults;
};

export const recordGoalState: RecordGoalsHandler = async (data) => {
  const { goalStates } = data.message;
  if (goalStates.length === 0) return true;

  goalStates.sort((a, b) => {
    const dateA = a.updatedAt
      ? new Date(a.updatedAt).getTime()
      : Number.POSITIVE_INFINITY;
    const dateB = b.updatedAt
      ? new Date(b.updatedAt).getTime()
      : Number.POSITIVE_INFINITY;
    return dateA - dateB;
  });

  await dexie.history.add({
    uuid: crypto.randomUUID(),
    date: data.message.date,
    goalStates,
  });
  return true;
};

export const getSearchExample: GetSearchExampleHandler = async (data) => {
  const { selected } = data.message;

  const array = shuffleArray(
    await dexie.goals.filter((g) => !selected.includes(g.uuid)).toArray()
  );

  const example = array[0];
  if (!example) return '';

  return example.instruction.toLowerCase();
};

let isUpdatingGoals = false;
export const updateGoalsList: UpdateGoalsListHandler = async (data) => {
  if (isUpdatingGoals) return true;
  isUpdatingGoals = true;
  const { lastLoadedChunk, latestChunk, categoryList } = data.message;
  let currentUpdate = lastLoadedChunk;
  try {
    updateDataQueue.defineHandler(async (update) => {
      // Adding new goals:
      dexie.goals
        .bulkAdd(update.addedGoalObjects)
        .then(() => {
          // Removing goals:
          for (const goalUuid of update.removedGoalUuids) {
            dexie.goals.where('uuid').equals(goalUuid).delete();
          }
          // Updating goals:
          // TODO.
        })
        .then(() => {
          currentUpdate = update.chunk;
        });
    });
    startGoalUpdateProcess(lastLoadedChunk, latestChunk, categoryList);
    isUpdatingGoals = false;
    return true;
  } catch (error) {
    console.error('Error updating goals', error);
    isUpdatingGoals = false;

    return {
      error: error instanceof Error ? error.message : String(error),
      updateFailedAtChunk: currentUpdate,
    };
  }
};
