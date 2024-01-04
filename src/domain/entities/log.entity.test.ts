import { LogEntity, LogSeverityLevel } from "./log.entity";


describe('log.entity.ts', () => {

  const level = LogSeverityLevel.high;
  const message = 'test-message';
  const origin = 'log.entity.test.ts';
  const createdAt = '2023-12-18T23:53:00.151Z';


  test('Should create a LogEntity instance', () => {

    const log = new LogEntity({ level, message, origin });

    expect( log ).toBeInstanceOf( LogEntity );
    expect( log.level ).toEqual( level );
    expect( log.message ).toEqual( message );
    expect( log.origin ).toEqual( origin );
    expect( log.createdAt ).toBeInstanceOf( Date );
  });


  test('Should create a LogEntity instance from json', () => {

    const message = 'Service https://google.com working';
    const level = 'low';
    const origin = 'CheckServiceMultiple';

    const json = `{"message":"${ message }","level":"${ level }","origin":"${ origin }","createdAt":"${ createdAt }"}`;

    const log = LogEntity.fromJson( json );

    expect( log ).toBeInstanceOf( LogEntity );
    expect( log.level ).toEqual( level );
    expect( log.message ).toEqual( message );
    expect( log.origin ).toEqual( origin );
    expect( log.createdAt ).toBeInstanceOf( Date );
  });


  test('Should create a LogEntity instance from object', () => {

    const log = LogEntity.fromObject({ level, message, origin, createdAt });

    expect( log ).toBeInstanceOf( LogEntity );
    expect( log.level ).toEqual( level );
    expect( log.message ).toEqual( message );
    expect( log.origin ).toEqual( origin );
    expect( log.createdAt ).toBeInstanceOf( Date );
  });

});
