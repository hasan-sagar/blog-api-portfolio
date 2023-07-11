import * as nodemailer from 'nodemailer';

const SendEmail = async (to: any, text: any, subject: any) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    secure: true,
    auth: {
      user: 'khsagar0512@gmail.com',
      pass: process.env.google_pass,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  let mailOptions = {
    from: 'Ecommerce-Admin<khsagar0512@gmail.com>',
    to: to,
    subject: subject,
    text: text,
  };

  return await transporter.sendMail(mailOptions);
};

export default SendEmail;
