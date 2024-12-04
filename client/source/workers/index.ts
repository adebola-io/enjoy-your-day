const pgLiteWorkerURL = import.meta.resolve('./pglite.ts');
export const pgLiteWorker = new Worker(pgLiteWorkerURL, { type: 'module' });

export const db = {
  query: dbQuery,
  exec: dbExec,
};

type QueryFnParams = Parameters<import('@electric-sql/pglite').PGlite['query']>;
type ExecFnParams = Parameters<import('@electric-sql/pglite').PGlite['exec']>;

function dbQuery(...args: QueryFnParams) {
  return new Promise((resolve, reject) => {
    pgLiteWorker.postMessage({ type: 'query', args });
    pgLiteWorker.onmessage = (event) => {
      resolve(event.data);
    };
    pgLiteWorker.onerror = (event) => {
      reject(event);
    };
  });
}

function dbExec(...args: ExecFnParams) {
  return new Promise((resolve, reject) => {
    pgLiteWorker.postMessage({ type: 'exec', args });
    pgLiteWorker.onmessage = (event) => {
      resolve(event.data);
    };
    pgLiteWorker.onerror = (event) => {
      reject(event);
    };
  });
}
