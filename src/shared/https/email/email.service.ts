import { Injectable } from '@nestjs/common'
// import { MailerService } from '@nestjs-modules/mailer'
import { Resend } from 'resend'

import { EnvService } from '@/shared/env/env.service'
// import { ENVIRONMENTS } from '@/shared/utils/constants'

type SendEmailParams = {
  to: string
  subject: string
  body: string
}

@Injectable()
export class EmailService {
  constructor(
    // private readonly mailerService: MailerService,
    private readonly envService: EnvService
  ) {}

  private resendSDK = new Resend(this.envService.get('RESEND_API_KEY'))
  // private isProduction =
  //   this.envService.get('NODE_ENV') === ENVIRONMENTS.PRODUCTION

  /**
   * Constructs an email payload for sending.
   * @param {string} to - The recipient's email address.
   * @param {string} subject - The subject line of the email.
   * @param {string} body - The HTML content of the email body.
   */
  private buildEmailPayload(to: string, subject: string, body: string) {
    const isDev = this.envService.get('NODE_ENV') === 'development'

    return {
      to,
      from: isDev ? 'delivered@resend.dev' : 'support@vetplus.com',
      subject,
      text: body,
      html: body,
    }
  }

  async sendEmail({ to, subject, body }: SendEmailParams) {
    // if (this.isProduction) {
    await this.resendSDK.emails.send(this.buildEmailPayload(to, subject, body))
    // } else {
    //   this.mailerService.sendMail(this.buildEmailPayload(to, subject, body))
    // }
  }
}
