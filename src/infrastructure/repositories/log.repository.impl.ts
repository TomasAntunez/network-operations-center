import { LogDatasource } from "../../domain/datasources";
import { LogEntity, LogSeverityLevel } from "../../domain/entities";
import { LogRepository } from "../../domain/repositories";


export class LogRepositoryImpl implements LogRepository {

  constructor( private readonly logDatasource: LogDatasource ) {}


  async saveLog( log: LogEntity ): Promise<void> {
    this.logDatasource.saveLog( log );
  }

  async getLogs( severityLevel: LogSeverityLevel ): Promise<LogEntity[]> {
    return this.logDatasource.getLogs( severityLevel );
  }

}
