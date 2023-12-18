import { LogSeverityLevel } from '../../entities';
import { CreateLog } from '../logs';

import { EmailService } from '../../../presentation/email';


interface SendEmailWithLogsUseCase {
  execute( to: string | string[] ): Promise<boolean>;
}


export class SendEmailWithLogs implements SendEmailWithLogsUseCase {

  constructor(
    private readonly emailService: EmailService,
    private readonly createLog: CreateLog
  ) {}


  async execute( to: string | string[] ): Promise<boolean> {

    const origin = SendEmailWithLogs.name;

    try {
      const emailSent = await this.emailService.sendEmailWithLogs(to);

      if (!emailSent) throw new Error('Email not sent');

      this.createLog.execute({
        level: LogSeverityLevel.low,
        message: 'Email sent',
        origin,
      });

      return true;

    } catch (error) {
      this.createLog.execute({
        level: LogSeverityLevel.high,
        message: 'Email not sent',
        origin,
      });

      return false;
    }

  }

}
