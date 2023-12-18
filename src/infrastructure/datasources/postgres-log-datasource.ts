import { PrismaClient, SeverityLevel as PrismaSeverityLevel } from "@prisma/client";

import { LogDatasource } from "../../domain/datasources";
import { LogEntity, LogSeverityLevel } from "../../domain/entities";


const severityLevelEquivalences = {
  [LogSeverityLevel.low]: PrismaSeverityLevel.LOW,
  [LogSeverityLevel.medium]: PrismaSeverityLevel.MEDIUM,
  [LogSeverityLevel.high]: PrismaSeverityLevel.HIGH,
};


export class PostgresLogDatasource implements LogDatasource {

  constructor( private readonly prismaClient: PrismaClient ) {}


  async saveLog(log: LogEntity): Promise<void> {
    
    const { level, ...logRest } = log;

    await this.prismaClient.log.create({
      data: {
        ...logRest,
        level: severityLevelEquivalences[level]
      }
    });

  }


  async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
    
    const logs = await this.prismaClient.log.findMany({
      where: {
        level: severityLevelEquivalences[severityLevel],
      }
    });

    return logs.map( LogEntity.fromObject );

  }

}
