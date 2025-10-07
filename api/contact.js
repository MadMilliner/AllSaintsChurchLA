import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { first_name, last_name, email, message } = req.body;

  if (!first_name || !email || !message) {
    return res.status(400).json({ error: 'Please fill in all required fields.' });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",       // e.g. "smtp.gmail.com"
      port: 465,
      secure: true,                      // use SSL
      auth: {
        type: "login",
        user: process.env.SMTP_USER,     // your email address
        pass: process.env.SMTP_PASS,     // app password or mail password
      },
    });
//     const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: process.env.SMTP_USER,
//     pass: process.env.SMTP_PASS,
//   },
// });

    console.log('SMTP_USER:', process.env.SMTP_USER ? '[SET]' : '[MISSING]');
    console.log('SMTP_PASS:', process.env.SMTP_PASS ? '[SET]' : '[MISSING]');

    await transporter.sendMail({
      from: `"${first_name} ${last_name || ''}" <${email}>`,
      to: 'admin@allsaintsla.church',
      subject: 'New Contact Form Submission',
      text: `
Name: ${first_name} ${last_name || ''}
Email: ${email}

Message:
${message}
      `,
    });

    return res.status(200).json({ success: 'Message sent successfully!' });
  } catch (error) {
    console.error('Email send failed:', error);
    return res.status(500).json({ error: error.message || 'Failed to send message.' });
  }
}

// console.log('SMTP_HOST:', process.env.SMTP_HOST);
// console.log('SMTP_USER:', process.env.SMTP_USER ? '[SET]' : '[MISSING]');
// console.log('SMTP_PASS:', process.env.SMTP_PASS ? '[SET]' : '[MISSING]');
