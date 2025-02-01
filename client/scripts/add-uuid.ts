// Bun script to assign UUIDs to goals in the JSON files.
import path from 'node:path';
import type { GoalProps } from '../source/data/entities';
import fs from 'node:fs';
import { assert } from 'node:console';

const OLDEST_UNASSIGNED_CHUNK = 16;

/**
 * Assigns a unique UUID to each goal in the provided array.
 * @param goals - An array of GoalProps objects to assign UUIDs to.
 * @returns The input goals array with UUIDs assigned to each goal.
 */
function assignGoalUuids(goals: GoalProps[], meta: string) {
  assert(
    goals.length === 30,
    'There must be 30 goals per chunk. Found: ' + goals.length + ' in ' + meta
  );
  for (const goal of goals) {
    goal.uuid = crypto.randomUUID();
  }
  return goals;
}

const jsonFiles = fs
  .readdirSync('./public/json')
  .filter((file) => file.endsWith('.json') && !file.startsWith('schema'));

for (const file of jsonFiles) {
  const chunkNo = Number(file.split('.')[0]);
  if (chunkNo <= OLDEST_UNASSIGNED_CHUNK) continue;

  const data = JSON.parse(
    fs.readFileSync(path.join('./public/json', file), 'utf-8')
  );
  console.log(`Processing ${file}`);
  data.goals.added = assignGoalUuids(data.goals.added, file);
  fs.writeFileSync(
    path.join('./public/json', file),
    JSON.stringify(data, null, 2)
  );
}
