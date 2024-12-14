import { PGliteWorker } from '@electric-sql/pglite/worker';
import pgLiteWorkerURL from './pglite.worker?worker&url';
import { runMigrations } from './migrations';
import { updateGoals } from './seeders';

const dbHandle = new PGliteWorker(
  new Worker(pgLiteWorkerURL, { type: 'module' })
);
let databaseInitializeResolver: null | (() => void) = null;

/** Outer anchor to wait for database initialization. */
export const databaseInitializing = new Promise<void>((resolve) => {
  databaseInitializeResolver = resolve;
});

export async function getDatabaseHandle() {
  await databaseInitializing;
  if (!dbHandle) {
    throw new Error('Database not initialized. Something went horribly wrong.');
  }
  return dbHandle;
}

export async function initializeDatabase() {
  console.groupCollapsed(
    '%cPGlite',
    'background-color: #c3aa02; color: white; font-weight: bold; padding: 3px 6px; border-radius: 5px',
    'initializing database'
  );

  if (import.meta.env.DEV) {
    Reflect.set(window, '__databaseHandle', dbHandle);
  }

  await runMigrations(dbHandle);
  await updateGoals(dbHandle);

  databaseInitializeResolver?.();
  console.groupEnd();
}

export async function createUser(name: string) {
  const handle = await getDatabaseHandle();
  return handle.query('INSERT INTO users (name) VALUES ($1)', [name]);
}

export * from './entities';
export * from './migrations';
