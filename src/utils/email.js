const nodemailer = require('nodemailer');

const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT) || 587,
    secure: process.env.EMAIL_PORT === '465',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
};

const sendContactEmail = async (contact) => {
  const transporter = createTransporter();
  
  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: process.env.EMAIL_USER,
    subject: `New Portfolio Contact: ${contact.subject}`,
    html: `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${contact.name}</p>
      <p><strong>Email:</strong> ${contact.email}</p>
      <p><strong>Subject:</strong> ${contact.subject}</p>
      <p><strong>Message:</strong></p>
      <p>${contact.message.replace(/\n/g, '<br>')}</p>
      <hr>
      <p><small>Submitted at: ${new Date(contact.createdAt).toLocaleString()}</small></p>
      <p><small>IP: ${contact.ipAddress}</small></p>
    `
  };
  
  await transporter.sendMail(mailOptions);
  
  const autoReplyOptions = {
    from: process.env.EMAIL_FROM,
    to: contact.email,
    subject: 'Thank you for contacting me!',
    html: `
      <h2>Hi ${contact.name},</h2>
      <p>Thank you for reaching out! I've received your message and will get back to you as soon as possible.</p>
      <p><strong>Your message:</strong></p>
      <p>${contact.message.replace(/\n/g, '<br>')}</p>
      <hr>
      <p>Best regards,<br>Portfolio Owner</p>
    `
  };
  
  await transporter.sendMail(autoReplyOptions);
};

module.exports = { sendContactEmail };