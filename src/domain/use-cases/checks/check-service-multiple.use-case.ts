import { LogSeverityLevel } from "../../entities";
import { CreateLogMultiple } from "../logs";


interface CheckServiceMultipleUseCase {
  execute( url: string ): Promise<boolean>;
}

type SuccessCallback = (() => void) | undefined;
type ErrorCallback = (( error: string ) => void) | undefined;


export class CheckServiceMultiple implements CheckServiceMultipleUseCase {

  constructor(
    private readonly createLogMultiple: CreateLogMultiple,
    private readonly successCallback: SuccessCallback,
    private readonly errorCallback: ErrorCallback
  ) {}


  async execute( url: string ): Promise<boolean> {

    const origin = CheckServiceMultiple.name;

    try {
      const { ok } = await fetch( url );

      if ( !ok ) throw new Error(`Error on check service: ${ url }`);

      this.createLogMultiple.execute({
        message: `Service ${ url } working`,
        level: LogSeverityLevel.low,
        origin,
      });

      this.successCallback && this.successCallback();

      return true;

    } catch (error) {
      const errorMessage = `${ url } is not ok - ${ error }`;

      this.createLogMultiple.execute({
        message: errorMessage,
        level: LogSeverityLevel.high,
        origin,
      })

      this.errorCallback && this.errorCallback(errorMessage);

      return false;
    }

  }

}
