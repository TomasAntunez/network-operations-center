import { LogEntity, LogSeverityLevel } from "../../entities";
import { CreateLog } from "../logs";


interface CheckServiceUseCase {
  execute( url: string ): Promise<boolean>;
}

type SuccessCallback = (() => void) | undefined;
type ErrorCallback = (( error: string ) => void) | undefined;


export class CheckService implements CheckServiceUseCase {

  constructor(
    private readonly createLog: CreateLog,
    private readonly successCallback: SuccessCallback,
    private readonly errorCallback: ErrorCallback
  ) {}


  async execute( url: string ): Promise<boolean> {

    const origin = CheckService.name;

    try {
      const { ok } = await fetch( url );

      if ( !ok ) throw new Error(`Error on check service: ${ url }`);

      this.createLog.execute({
        message: `Service ${ url } working`,
        level: LogSeverityLevel.low,
        origin,
      });

      this.successCallback && this.successCallback();

      return true;

    } catch (error) {
      const errorMessage = `${ url } is not ok - ${ error }`;

      this.createLog.execute({
        message: errorMessage,
        level: LogSeverityLevel.high,
        origin,
      })

      this.errorCallback && this.errorCallback(errorMessage);

      return false;
    }

  }

}
