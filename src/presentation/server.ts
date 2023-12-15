import { CheckService } from '../domain/use-cases/checks';

import { FileSystemDatasource } from '../infrastructure/datasources';
import { LogRepositoryImpl } from '../infrastructure/repositories';

import { CronService } from './cron';


const fileSystemLogRepository = new LogRepositoryImpl( new FileSystemDatasource() );


export class Server {

  static start() {

    console.log('Server started...');

    const onTick = () => {
      const url = 'https://localhost:3000';

      new CheckService(
        fileSystemLogRepository,
        () => console.log(`${ url } is ok`),
        (error) => console.log(error)
      ).execute( url );
    };

    CronService.createJob( '*/5 * * * * *', onTick );

  }

}
