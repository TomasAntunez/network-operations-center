import { LogEntityOptions, LogEntity } from '../../entities';
import { LogRepository } from '../../repositories';


interface CreateLogMultipleUseCase {
  execute( options: LogEntityOptions ): Promise<void>;
}


export class CreateLogMultiple implements CreateLogMultipleUseCase {

  constructor( private readonly logRepositories: LogRepository[] ) {}


  private callLogRepositories( log: LogEntity ) {
    this.logRepositories.forEach( logRepository => {
      logRepository.saveLog( log );
    });
  }

  async execute( options: LogEntityOptions ): Promise<void> {
    
    const log = new LogEntity(options);

    this.callLogRepositories( log );

  }

}
