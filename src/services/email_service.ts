import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export const sendEmail = async (
  to: string,
  subject: string,
  htmlOrText: string
) => {
  if (!to) {
    console.error("❌ Email recipient is missing!");
    throw new Error("Recipient email address is required");
  }

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    html: htmlOrText,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (err) {
    throw err;
  }
};
