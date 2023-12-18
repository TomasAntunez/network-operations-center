
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
    const { level, message, origin, createdAt } = JSON.parse(json);

    return new LogEntity({ level, message, origin, createdAt });
  }


  static fromObject( object: { [key: string]: any } ): LogEntity {
    const { message, level, createdAt, origin } = object;

    return new LogEntity({ message, level, createdAt, origin });
  }

}
