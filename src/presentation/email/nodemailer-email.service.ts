import { Transporter, SentMessageInfo, createTransport } from 'nodemailer';

import { EmailService } from '../../domain/services';
import { LogSeverityLevel } from '../../domain/entities';
import { CreateLog } from '../../domain/use-cases/logs';

import { envs } from '../../config/plugins';

import { LogsFilesLocationsEntity } from '../../infrastructure/entities';


interface SendEmailOptions {
  to: string | string[];
  subject: string;
  htmlBody: string;
  attachments?: Attachment[];
}

interface Attachment {
  fileName: string;
  path: string;
}


export class NodemailerEmailService implements EmailService {

  private readonly transport = this.createTransport();


  constructor(
    private readonly logsFilesLocationsEntity: LogsFilesLocationsEntity,
    private readonly createLog: CreateLog
  ) {}


  private createTransport(): Transporter<SentMessageInfo> {

    const { SERVICE, EMAIL, SECRET_KEY } = envs.mailer;

    return createTransport({
      service: SERVICE,
      auth: {
        user: EMAIL,
        pass: SECRET_KEY,
      },
    });
  }


  private async sendEmail( options: SendEmailOptions ): Promise<boolean> {

    const { to, subject, htmlBody, attachments } = options;
    const origin = EmailService.name;

    try {
      await this.transport.sendMail({
        to,
        subject,
        html: htmlBody,
        attachments,
      });

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


  async sendEmailWithLogs( to: string | string[] ): Promise<boolean> {

    const subject = 'Server logs';
    const htmlBody = `
      <h3>System logs - NOC</h3>
      <p>It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>
      <p>See attached logs</p>
    `;

    const {
      logsDirPath, allLogsFileName, mediumLogsFileName, highLogsFileName
    } = this.logsFilesLocationsEntity;

    const attachments: Attachment[] = [
      { fileName: allLogsFileName, path: `./${ logsDirPath }/${ allLogsFileName }` },
      { fileName: mediumLogsFileName, path: `./${ logsDirPath }/${ mediumLogsFileName }` },
      { fileName: highLogsFileName, path: `./${ logsDirPath }/${ highLogsFileName }` },
    ];

    return this.sendEmail({ to, subject, htmlBody, attachments });

  }

}
