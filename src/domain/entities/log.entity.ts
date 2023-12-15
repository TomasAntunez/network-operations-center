
export enum LogSeverityLevel {
  low = 'low',
  medium = 'medium',
  high = 'high',
}


export class LogEntity {

  readonly level: LogSeverityLevel;
  readonly message: string;
  createdAt: Date;


  constructor( message: string, level: LogSeverityLevel ) {
    this.message = message;
    this.level = level;
    this.createdAt = new Date();
  }


  static fromJson( json: string ): LogEntity {
    const { message, level, createdAt } = JSON.parse(json);

    const log = new LogEntity(message, level);

    log.createdAt = new Date(createdAt);

    return log;
  }

}
