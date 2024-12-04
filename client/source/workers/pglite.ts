import { PGlite } from '@electric-sql/pglite';

const db = new PGlite('idb://enjoy-your-day-db');

function query(...args: Parameters<typeof db.query>) {
  return db.query(...args);
}

function exec(...args: Parameters<typeof db.exec>) {
  return db.exec(...args);
}

self.onmessage = (event) => {
  const { type, args } = event.data;
  switch (type) {
    case 'query':
      //@ts-ignore
      query(...args).then((result) => {
        self.postMessage(result);
      });
      break;
    case 'exec':
      //@ts-ignore
      exec(...args).then((result) => {
        self.postMessage(result);
      });
      break;
  }
};
