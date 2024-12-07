import type { Migration } from './entities';
import pgLiteWorkerURL from './pglite.worker?worker&url';
import {
  migrations,
  createMigrationsTableQuery,
  applyMigrations,
} from './migrations';

let handle: import('@electric-sql/pglite/worker').PGliteWorker;
let databaseInitializeResolver: null | (() => void) = null;

/** Outer anchor to wait for database initialization. */
export const databaseInitializing = new Promise<void>((resolve) => {
  databaseInitializeResolver = resolve;
});

export async function getDatabaseHandle() {
  await databaseInitializing;
  if (!handle) {
    throw new Error('Database not initialized. Something went horribly wrong.');
  }
  return handle;
}

export async function initializeDatabase() {
  // The PGliteWorker is imported dynamically to avoid bundling it with the client.
  // and making it slower to load.
  const pgLiteModule = await import('@electric-sql/pglite/worker');
  handle = new pgLiteModule.PGliteWorker(
    new Worker(pgLiteWorkerURL, { type: 'module' })
  );

  if (import.meta.env.DEV) {
    Reflect.set(window, '__databaseHandle', handle);
  }

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

  console.groupCollapsed('%c[pglite] Migrations applied.', 'color: #00ff00');
}

export async function createUser(name: string) {
  const handle = await getDatabaseHandle();
  return handle.query('INSERT INTO users (name) VALUES ($1)', [name]);
}

export * from './entities';
export * from './migrations';
