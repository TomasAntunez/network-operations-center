import { EmailService } from '../../services';


interface SendEmailWithLogsUseCase {
  execute( to: string | string[] ): Promise<void>;
}


export class SendEmailWithLogs implements SendEmailWithLogsUseCase {

  constructor( private readonly emailService: EmailService ) {}


  async execute( to: string | string[] ): Promise<void> {
    
    const emailSent = await this.emailService.sendEmailWithLogs(to);

    if (!emailSent) throw new Error('Email not sent');

  }

}
