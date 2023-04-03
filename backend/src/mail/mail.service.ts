import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { IUser } from '../users/interface/user.interface';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendResetPasswordLink(
    user: IUser,
    token: string,
    origin: string
  ): Promise<void> {
    const url = `${origin}/reset-password?email=${user.email}&token=${token}`;
    await this.mailerService.sendMail({
      to: user.email,
      subject: 'Reset your password',
      template: './change-password', // `.hbs` extension is appended automatically
      context: {
        // filling curly brackets with content
        name: user.firstName,
        url: url,
      },
    });
  }
}
