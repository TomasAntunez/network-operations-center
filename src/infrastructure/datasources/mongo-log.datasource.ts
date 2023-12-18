import { LogDatasource } from '../../domain/datasources';
import { LogEntity, LogSeverityLevel } from '../../domain/entities';

import { LogModel } from '../../data/mongo/models';


export class MongoLogDatasource implements LogDatasource {

  async saveLog(log: LogEntity): Promise<void> {

    const newLog = await LogModel.create(log);

    console.log( 'Mongo log created: ', newLog.id );
  }


  async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {

    const logs = await LogModel.find({ level: severityLevel });

    return logs.map( LogEntity.fromObject );
  }

}
