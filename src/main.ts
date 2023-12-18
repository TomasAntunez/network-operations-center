import { PrismaClient } from '@prisma/client';
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


  // const prisma = new PrismaClient();

  // const newLog = await prisma.log.create({
  //   data: {
  //     level: 'HIGH',
  //     message: 'Test message',
  //     origin: 'App',
  //   },
  // });

  // const logs = await prisma.log.findMany({
  //   where: {
  //     level: 'HIGH',
  //   }
  // });  // const logs = await prisma.log.findMany({
  //   where: {
  //     level: 'HIGH',
  //   }
  // });

  Server.start();

}
