// import { DATA_DIR, MOST_CURRENT_GOAL_UPDATE } from '#/data/constants';
import { useLocalStorage } from '@adbl/dom-cells/useLocalStorage';
import type { PGliteWorker } from '@electric-sql/pglite/worker';
// import type { Goal, User } from './entities';

export const lastAppliedGoalUpdate = useLocalStorage<number>(
  'last-applied-goal-update',
  0
);

export async function updateGoals(dbHandle: PGliteWorker) {
  dbHandle;
  // let i = lastAppliedGoalUpdate.value + 1;
  // const system = (
  //   await dbHandle.query(`SELECT user_uuid FROM users where is_admin = true;`)
  // ).rows[0] as User;
  // const system_uuid = system?.user_uuid;
  // let promises = [];
  // const runCombinedQuery = async (goals: Goal[]) => {
  //   let combinedQuery = '';
  //   for (const goal of goals) {
  //     const goalUUID = goal.goal_uuid;
  //     const goalTitle = goal.title.replace("'", "\\'");
  //     const goalInstruction = goal.instruction.replace("'", "\\\\'");
  //     const values = `${goalUUID}, ${goalTitle}', '${system_uuid}', '${goalInstruction}`;
  //     let query = `INSERT INTO goals (goal_uuid, title, user_uuid, instruction) VALUES ('${values}');`;
  //     combinedQuery += query;
  //   }
  //   console.log(combinedQuery);
  // };
  // while (i <= MOST_CURRENT_GOAL_UPDATE) {
  //   const fetchPromise = fetch(`${DATA_DIR}/update-${i}.json`)
  //     .then((res) => res.json())
  //     .then(runCombinedQuery)
  //     .catch((error) => console.error(error));
  //   promises.push(fetchPromise);
  //   i++;
  // }
  // await Promise.all(promises);
  // lastAppliedGoalUpdate.value = MOST_CURRENT_GOAL_UPDATE;
}
