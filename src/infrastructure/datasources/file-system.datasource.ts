import { existsSync, mkdirSync, writeFileSync, appendFileSync, readFileSync } from 'fs';

import { LogDatasource } from "../../domain/datasources";
import { LogEntity, LogSeverityLevel } from "../../domain/entities";

import { LogsFilesLocationsEntity } from '../entities';


export class FileSystemDatasource implements LogDatasource {

  private readonly logsDirPath: string;
  private readonly allLogsFilePath: string;
  private readonly mediumLogsFilePath: string;
  private readonly highLogsFilePath: string;


  constructor( logsFilesLocationsEntity: LogsFilesLocationsEntity ) {

    const { logsDirPath, allLogsFileName, mediumLogsFileName, highLogsFileName } = logsFilesLocationsEntity;

    this.logsDirPath = logsDirPath;
    this.allLogsFilePath = `${ this.logsDirPath }/${ allLogsFileName }`;
    this.mediumLogsFilePath = `${ this.logsDirPath }/${ mediumLogsFileName }`;
    this.highLogsFilePath = `${ this.logsDirPath }/${ highLogsFileName }`;

    this.createLogsFiles();
  }


  private createLogsFiles() {
    if ( !existsSync(this.logsDirPath) ) {
      mkdirSync( this.logsDirPath );
    }

    [
      this.allLogsFilePath,
      this.mediumLogsFilePath,
      this.highLogsFilePath,
    ].forEach( path => {
      if ( existsSync(path) ) return;
      writeFileSync( path, '' );
    });
  }


  private getLogsByPath( path: string ): LogEntity[] {
    const content = readFileSync( path, 'utf-8' );

    const logs = content.split(/\n/).map( LogEntity.fromJson );

    return logs;
  }


  async saveLog( newlog: LogEntity ): Promise<void> {

    const logAsJson = `${ JSON.stringify(newlog) }\n`;

    appendFileSync( this.allLogsFilePath, logAsJson );

    if ( newlog.level === LogSeverityLevel.low ) return;

    if ( newlog.level === LogSeverityLevel.medium ) {
      appendFileSync( this.mediumLogsFilePath, logAsJson );
      return;
    }

    appendFileSync( this.highLogsFilePath, logAsJson );
  }


  async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {

    switch (severityLevel) {
      case LogSeverityLevel.low:
        return this.getLogsByPath( this.allLogsFilePath );

      case LogSeverityLevel.medium:
        return this.getLogsByPath( this.mediumLogsFilePath );

      case LogSeverityLevel.high:
        return this.getLogsByPath( this.highLogsFilePath );

      default:
        throw new Error(`${ severityLevel } not implemented`);
    }

  }

}
