import { envs } from './config/plugins';

import { MongoDatabase } from './data/mongo';

import { Server } from "./presentation";


( async () => {
  main();
})();


async function main() {

  const { URL, DB_NAME } = envs.mongo;

  await MongoDatabase.connect({
    mongoUrl: URL,
    dbName: DB_NAME,
  });


  Server.start();

}
