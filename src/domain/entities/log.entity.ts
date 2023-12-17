
export enum LogSeverityLevel {
  low = 'low',
  medium = 'medium',
  high = 'high',
}

export interface LogEntityOptions {
  level: LogSeverityLevel;
  message: string;
  origin: string;
  createdAt?: Date;
}


export class LogEntity {

  readonly level: LogSeverityLevel;
  readonly message: string;
  readonly origin: string;
  readonly createdAt: Date;


  constructor( options: LogEntityOptions ) {

    const { message, level, origin, createdAt = new Date() } = options;

    this.message = message;
    this.level = level;
    this.origin = origin;
    this.createdAt = createdAt;
  }


  static fromJson( json: string ): LogEntity {
    const options = JSON.parse(json) as Required<LogEntityOptions>;

    const log = new LogEntity(options);

    return log;
  }

}
