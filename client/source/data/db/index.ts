import { PGliteWorker } from '@electric-sql/pglite/worker';
import type { Migration } from './entities';
import {
  migrations,
  createMigrationsTableQuery,
  applyMigrations,
} from './migrations';

const pgLiteWorkerURL = import.meta.resolve('./pglite.worker.ts');
export const handle = new PGliteWorker(
  new Worker(pgLiteWorkerURL, { type: 'module' })
);
if (import.meta.env.DEV) {
  Reflect.set(window, '__databaseHandle', handle);
}

let databaseInitializeResolver: null | (() => void) = null;
export const databaseInitializing = new Promise<void>((resolve) => {
  databaseInitializeResolver = resolve;
});
export async function initializeDatabase() {
  // ------------
  // MIGRATIONS.
  // ------------
  await handle.exec(createMigrationsTableQuery);
  const lastMigrationAppliedQuery = await handle.query(
    'SELECT name FROM migrations ORDER BY date_applied DESC LIMIT 1'
  );

  const lastMigration = lastMigrationAppliedQuery.rows[0] as
    | Migration
    | undefined;

  if (lastMigration) {
    const lastMigrationIndex = migrations.findIndex(
      (m) => m.name === lastMigration.name
    );
    if (lastMigrationIndex === -1) {
      const message = `Migration ${lastMigration.name} not found in migrations array. Database may have been corrupted.`;
      throw new Error(message);
    }
    const pendingMigrations = migrations.slice(lastMigrationIndex + 1);
    applyMigrations(handle, pendingMigrations);
  } else {
    applyMigrations(handle, migrations);
  }
  databaseInitializeResolver?.();
}

export async function createUser(name: string) {
  await databaseInitializing;
  return handle.query('INSERT INTO users (name) VALUES ($1)', [name]);
}

export * from './entities';
export * from './migrations';
