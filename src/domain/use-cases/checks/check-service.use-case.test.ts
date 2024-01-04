import { LogSeverityLevel } from "../../entities";
import { CreateLogUseCase } from "../logs";
import { CheckService } from "./check-service.use-case";


describe('check-service.use-case.ts', () => {

  const mockCreateLog: CreateLogUseCase = {
    execute: jest.fn(),
  };

  const mockSuccessCallback = jest.fn();
  const mockErrorCallback = jest.fn();

  const checkService = new CheckService(
    mockCreateLog,
    mockSuccessCallback,
    mockErrorCallback,
  );


  beforeEach( jest.clearAllMocks );


  test('Should call successCallback when fetch returns true', async () => {

    const isOk = await checkService.execute('https://google.com');

    expect( isOk ).toBe(true);
    expect( mockSuccessCallback ).toHaveBeenCalled();
    expect( mockErrorCallback ).not.toHaveBeenCalled();

    expect( mockCreateLog.execute ).toHaveBeenCalledWith({
      level: LogSeverityLevel.low,
      message: expect.any(String),
      origin: CheckService.name,
    });
  });


  test('Should call errorCallback when fetch returns false', async () => {

    const isOk = await checkService.execute('https://abc123456def.com');

    expect( isOk ).toBe(false);
    expect( mockSuccessCallback ).not.toHaveBeenCalled();
    expect( mockErrorCallback ).toHaveBeenCalled();

    expect( mockCreateLog.execute ).toHaveBeenCalledWith({
      level: LogSeverityLevel.high,
      message: expect.any(String),
      origin: CheckService.name,
    });
  });

});
