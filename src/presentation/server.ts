import { LogSeverityLevel } from '../domain/entities';
import { CheckService } from '../domain/use-cases/checks';
import { CreateLog } from '../domain/use-cases/logs';
import { SendEmailWithLogs } from '../domain/use-cases/email';

import { LogsFilesLocationsEntity } from '../infrastructure/entities';
import { FileSystemLogDatasource, MongoLogDatasource } from '../infrastructure/datasources';
import { LogRepositoryImpl } from '../infrastructure/repositories';

import { CronService } from './cron';
import { EmailService } from './email';


export class Server {

  static async start() {

    console.log('Server started...');


    const logsFilesLocationsEntity = new LogsFilesLocationsEntity();

    const logRepository = new LogRepositoryImpl(
      new FileSystemLogDatasource( logsFilesLocationsEntity )
      // new MongoLogDatasource()
    );

    const createLog = new CreateLog( logRepository );

    // const emailService = new EmailService( logsFilesLocationsEntity );

    // new SendEmailWithLogs( emailService, createLog ).execute('chuliantunez@gmail.com');

    // for ( let i = 0; i < 10; i++ ) {
    //   await createLog.execute({
    //     level: LogSeverityLevel.low,
    //     message: `Test ${ i }`,
    //     origin: 'Server',
    //   });
    // }

    const logs = await logRepository.getLogs( LogSeverityLevel.low );

    console.log({ logs });


    // const onTick = () => {
    //   const url = 'https://google.com';

    //   new CheckService(
    //     createLog,
    //     () => console.log(`${ url } is ok`),
    //     (error) => console.log(error)
    //   ).execute( url );
    // };

    // CronService.createJob( '*/5 * * * * *', onTick );

  }

}
