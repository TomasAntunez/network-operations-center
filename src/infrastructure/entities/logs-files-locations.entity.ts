
interface LogsFilesLocationsEntityOptions {
  logsDirPath?: string;
  allLogsFileName?: string;
  mediumLogsFileName?: string;
  highLogsFileName?: string;
}


export class LogsFilesLocationsEntity {

  readonly logsDirPath: string;
  readonly allLogsFileName: string;
  readonly mediumLogsFileName: string;
  readonly highLogsFileName: string;


  constructor( options: LogsFilesLocationsEntityOptions = {} ) {

    const {
      logsDirPath = 'logs',
      allLogsFileName = 'logs-all.log',
      mediumLogsFileName = 'logs-medium.log',
      highLogsFileName = 'logs-high.log',
    } = options;

    this.logsDirPath = logsDirPath;
    this.allLogsFileName = allLogsFileName;
    this.mediumLogsFileName = mediumLogsFileName;
    this.highLogsFileName = highLogsFileName;

  }

}
