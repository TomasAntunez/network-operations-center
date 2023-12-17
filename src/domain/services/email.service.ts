
export abstract class EmailService {
  abstract sendEmailWithLogs( to: string | string[] ): Promise<boolean>;
}
