import { LogEntity, LogSeverityLevel } from "../entities";
import { LogDatasource } from "./log.datasource";


describe('log.datasource.ts', () => {

  const log = new LogEntity({
    origin: 'log.datasource.test.ts',
    message: 'test-message',
    level: LogSeverityLevel.low,
  });


  class MockLogDatasource implements LogDatasource {

    async saveLog(log: LogEntity): Promise<void> {}

    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
      return [log];
    }

  }


  test('Should test the abstract class', async () => {

    const mockLogDatasource = new MockLogDatasource();

    expect( mockLogDatasource ).toBeInstanceOf( MockLogDatasource );
    expect( typeof mockLogDatasource.saveLog ).toBe( 'function' );
    expect( typeof mockLogDatasource.getLogs ).toBe( 'function' );

    await mockLogDatasource.saveLog( log );
    const logs = await mockLogDatasource.getLogs( LogSeverityLevel.high );

    console.log({ logs })

    expect( logs ).toHaveLength(1);
    expect( logs[0] ).toBeInstanceOf( LogEntity );
  });

});
