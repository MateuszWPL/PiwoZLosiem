import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.MAILTRAP_HOST,
  port: process.env.MAILTRAP_PORT,
  auth: {
    user: process.env.MAILTRAP_USER,
    pass: process.env.MAILTRAP_PASS,
  },
});

export async function sendResetEmail(to, token) {
  const resetLink = `${process.env.FRONTEND_URL}/reset-hasla?token=${token}`;

   const htmlContent = `
    <div style="font-family: Arial, sans-serif; background-color: #f4f6f8; padding: 20px;">
      <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #81c784;">

        <div style="background-color: #22392E; padding: 0px; text-align: center;">
          <img src="https://i.imgur.com/5WsWIoB.png" alt="Logo" style="height:200px; object-fit: contain;">
        </div>

        <div style="padding: 30px; color: #333;">
          <h2 style="color: #d35226;">Reset hasła</h2>
          <p>Otrzymaliśmy prośbę o zresetowanie hasła dla Twojego konta.</p>
          <p>Kliknij przycisk poniżej, aby ustawić nowe hasło:</p>

          <div style="text-align: center; margin: 20px 0;">
            <a href="${resetLink}" 
               style="display: inline-block; padding: 12px 24px; background-color: #d35226; color: white; text-decoration: none; border-radius: 6px; font-weight: bold;">
               Resetuj hasło
            </a>
          </div>

          <p>Jeśli nie prosiłeś o reset hasła, zignoruj tę wiadomość.</p>
        </div>

        <div style="background-color: #22392E; padding: 15px; text-align: center; font-size: 12px; color: #ffffff;">
          Piwo z Łosiem &copy; 2025
        </div>
      </div>
    </div>
  `;

  await transporter.sendMail({
    from: '"Piwo z Łosiem" <no-reply@piwozlosiem.pl>',
    to,
    subject: "Link do zresetowania hasła",
    text: `Kliknij tutaj, aby zresetować hasło: ${resetLink} /n`,
    html: htmlContent,
  });
  console.log(`Link do resetu hasła wysłany: ${resetLink}`);
}


