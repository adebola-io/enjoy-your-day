import type { GoalProps } from '#/data/entities';
import fs from 'node:fs';

const OLDEST_UNASSIGNED_CHUNK = 14;

/**
 * Assigns a unique UUID to each goal in the provided array.
 * @param goals - An array of GoalProps objects to assign UUIDs to.
 * @returns The input goals array with UUIDs assigned to each goal.
 */
function assignGoalUuids(goals: GoalProps[]) {
  for (const goal of goals) {
    goal.uuid = crypto.randomUUID();
  }
  return goals;
}

const jsonFiles = fs
  .readdirSync('./')
  .filter((file) => file.endsWith('.json') && !file.startsWith('schema'));

for (const file of jsonFiles) {
  const chunkNo = Number(file.split('.')[0]);
  if (chunkNo < OLDEST_UNASSIGNED_CHUNK) continue;

  const data = JSON.parse(fs.readFileSync(file, 'utf-8'));
  data.goals.added = assignGoalUuids(data.goals.added);
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
}
