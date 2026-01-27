import nodemailer from 'nodemailer';

export class EmailService {
  async sendWelcomeEmail(name: string, email: string) {
    // Cria uma conta de teste fake automaticamente
    const testAccount = await nodemailer.createTestAccount();

    const transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });

    const info = await transporter.sendMail({
      from: '"SmartEnvios Team" <no-reply@smartenvios.com>',
      to: email,
      subject: "Bem-vindo à SmartEnvios! 🚚",
      text: `Olá ${name}, obrigado pelo interesse! Em breve entraremos em contato.`,
      html: `<b>Olá ${name}</b>, obrigado pelo interesse! <br> Em breve entraremos em contato.`,
    });

    console.log("Mensagem enviada: %s", info.messageId);
    // Isso vai gerar um link no terminal para você ver o email fake:
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  }
}