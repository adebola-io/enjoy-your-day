import _001_initial_up from './_001_initial/up.sql?raw';
import _001_initial_down from './_001_initial/down.sql?raw';

import type { MigrationObject } from '../entities';
import type { PGliteWorker } from '@electric-sql/pglite/worker';
import { useLocalStorage } from '@adbl/dom-cells/useLocalStorage';

export async function applyMigrations(
  db: PGliteWorker,
  migrations: MigrationObject[]
) {
  for (const migration of migrations) {
    await db.exec(migration.up);
    await db.query('INSERT INTO migrations (name) VALUES ($1)', [
      migration.name,
    ]);
  }
}

export const createMigrationsTableQuery = `
CREATE TABLE IF NOT EXISTS migrations (
  name VARCHAR(255) PRIMARY KEY NOT NULL,
  date_applied TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`;

export const migrations: MigrationObject[] = [
  {
    name: '_001_initial',
    up: _001_initial_up,
    down: _001_initial_down,
  },
];

export const lastDatabaseMigration = useLocalStorage<string>(
  'last-db-migration',
  '___'
);

export async function runMigrations(dbHandle: PGliteWorker) {
  let pendingMigrations: MigrationObject[] = [];
  if (lastDatabaseMigration.value !== '___') {
    const lastMigrationIndex = migrations.findIndex(
      (m) => m.name === lastDatabaseMigration.value
    );
    if (lastMigrationIndex === -1) {
      const message = `Migration ${lastDatabaseMigration.value} not found in migrations array. Database may have been corrupted.`;
      throw new Error(message);
    }
    pendingMigrations = migrations.slice(lastMigrationIndex + 1);
  } else {
    await dbHandle.exec(createMigrationsTableQuery);
    pendingMigrations = migrations;
  }

  applyMigrations(dbHandle, pendingMigrations);
  const finalMigration = pendingMigrations.at(-1);
  if (finalMigration) {
    lastDatabaseMigration.value = finalMigration.name;
  }
  console.log(
    'Migrations successful. The last migration was',
    `"${lastDatabaseMigration.value}".`
  );
}
