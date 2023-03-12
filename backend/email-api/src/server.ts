import express from 'express';
import nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

let transportOptions: SMTPTransport.Options;
if (process.env.GCLOUD_PROJECT || process.env.NODE_ENV === 'production') {
  transportOptions = {};
} else {
  for (const name of ['DEV_NAME', 'DEV_USER', 'DEV_PASS']) {
    if (process.env[name] === undefined) {
      console.error(`${name} was not set!`);
    }
  }
  transportOptions = {
    host: process.env['DEV_HOST'] ?? 'smtp.ethereal.email',
    port: Number(process.env['DEV_PORT']) ?? 587,
    secure: false,
    auth: {
      user: process.env['DEV_USER'],
      pass: process.env['DEV_PASS'],
    },
  };
}

const transporter = nodemailer.createTransport(transportOptions);

const server = express()
  .disable('x-powered-by')
  .use(express.json())
  .post('/email-api', async (req: express.Request, res: express.Response) => {
    try {
      if (req.url.slice(-1) == '/') {
        const redirectUrl = req.url.slice(0, -1);
        if (redirectUrl != '') {
          res.redirect(301, redirectUrl);
        }
      }

      const info = await transporter.sendMail({
        from: '"Automated Feedback 🤖" <noreply@codyduong.dev>',
        to: 'feedback@codyduong.dev',
        subject: `Feedback from "${req.body.name}" <${req.body.email}>`,
        html: `<b>${req.body.message} Test?</b>`,
      });

      console.log('Message sent: %s', info.messageId);
      if (transportOptions.host === 'smtp.ethereal.email') {
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
      }

      res.status(200).json({
        sent: 'success',
      });
    } catch (e) {
      console.error(e);
      res.status(500).json({});
    }
  });

export default server;
