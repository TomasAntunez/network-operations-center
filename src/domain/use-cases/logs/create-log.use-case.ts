import { LogEntityOptions, LogEntity } from '../../entities';
import { LogRepository } from '../../repositories';


export interface CreateLogUseCase {
  execute( options: LogEntityOptions ): Promise<void>;
}


export class CreateLog implements CreateLogUseCase {

  constructor( private readonly logRepository: LogRepository ) {}


  async execute( options: LogEntityOptions ): Promise<void> {
    
    const log = new LogEntity(options);

    this.logRepository.saveLog( log );

  }

}
