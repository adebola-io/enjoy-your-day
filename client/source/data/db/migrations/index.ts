import _001_initial_up from './_001_initial/up.sql?raw';
import _001_initial_down from './_001_initial/down.sql?raw';

import type { MigrationObject } from '../entities';
import type { PGliteWorker } from '@electric-sql/pglite/worker';

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
