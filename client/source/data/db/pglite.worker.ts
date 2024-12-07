/**
 * Initializes a PGlite instance and stores it in IndexedDB.
 * This worker is responsible for managing the PGlite instance and providing access to it.
 */
import { PGlite } from '@electric-sql/pglite';
import { worker } from '@electric-sql/pglite/worker';
import { uuid_ossp } from '@electric-sql/pglite/contrib/uuid_ossp';

worker({
  async init() {
    return new PGlite({
      dataDir: 'idb://enjoy-your-day-db',
      extensions: { uuid_ossp },
    });
  },
});
