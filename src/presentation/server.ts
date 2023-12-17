import { CheckService } from '../domain/use-cases/checks';
import { CreateLog } from '../domain/use-cases/logs';
// import { SendEmailWithLogs } from '../domain/use-cases/email';

import { LogsFilesLocationsEntity } from '../infrastructure/entities';
import { FileSystemDatasource } from '../infrastructure/datasources';
import { LogRepositoryImpl } from '../infrastructure/repositories';

import { CronService } from './cron';
// import { NodemailerEmailService } from './email';


export class Server {

  static start() {

    console.log('Server started...');


    const logsFilesLocationsEntity = new LogsFilesLocationsEntity();

    const fileSystemLogRepository = new LogRepositoryImpl(
      new FileSystemDatasource( logsFilesLocationsEntity )
    );

    const createLog = new CreateLog( fileSystemLogRepository );

    // const emailService = new NodemailerEmailService( logsFilesLocationsEntity, createLog );

    // new SendEmailWithLogs( emailService ).execute('chuliantunez@gmail.com');


    const onTick = () => {
      const url = 'https://google.com';

      new CheckService(
        createLog,
        () => console.log(`${ url } is ok`),
        (error) => console.log(error)
      ).execute( url );
    };

    CronService.createJob( '*/5 * * * * *', onTick );

  }

}
