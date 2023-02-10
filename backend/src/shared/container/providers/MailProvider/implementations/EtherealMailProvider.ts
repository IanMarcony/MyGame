import nodemailer, { Transporter } from 'nodemailer';

import IMailProvider from '../interfaces/IMailProvider';

interface IMessage {
  to: string;
  body: string;
}

export default class EtherealMailProvider implements IMailProvider {
  private client: Transporter;

  constructor() {
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: process.env.MAIL_PORT as unknown as number,
      secure: false,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD,
      },
    });
    this.client = transporter;
  }

  public async sendMail(
    to: string,
    subject: string,
    body: string,
  ): Promise<void> {
    const message = await this.client.sendMail({
      from: 'Equipe MyGame <equipe@mygame.com.br> ',
      to,
      subject,
      text: body,
      html: body,
    });
    console.log('Message sent: %s', message.messageId);
  }
}
