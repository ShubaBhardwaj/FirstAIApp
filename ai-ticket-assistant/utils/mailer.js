import nodemailer from "nodemailer"
import dotenv from "dotenv"
import { err } from "inngest/types";
dotenv.config()

export const sendMail = async (to,subject,body) => {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.MAILTRAP_SMTP_HOST,
            port: process.env.MAILTRAP_SMTP_PORT,
            secure: false, // true for 465, false for other ports
            auth: {
            user: process.env.MAILTRAP_SMTP_USER,
            pass: process.env.MAILTRAP_SMTP_PASS,
            },
        });
    
        const info = await transporter.sendMail({
        from: '"Maddison Foo Koch" <maddison53@ethereal.email>',
        to: "bar@example.com, baz@example.com",
        subject: "Hello ✔",
        text: "Hello world?", // plain‑text body
        html: "<b>Hello world?</b>", // HTML body
      });
    
      console.log("Message sent:", info.messageId);
      return info;
    } catch (error) {
        console.log("Error:",error.message)
        throw error;
    }
}    