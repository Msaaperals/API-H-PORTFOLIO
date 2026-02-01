"use server";

import nodemailer from "nodemailer";

export async function sendEmail(formData: { name: string; email: string; message: string }) {
  const { name, email, message } = formData;

  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.error("CRITICAL: EMAIL_USER or EMAIL_PASS environment variables are missing!");
    return { success: false, error: "Server configuration error: missing credentials" };
  }

  console.log("Starting email send attempt for:", email);

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // use SSL
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS?.replace(/\s/g, ""), // Remove spaces if present
    },
  });

  const mailOptions = {
    from: `"Portfolio Query" <${process.env.EMAIL_USER}>`,
    to: "hinatabbasum50@gmail.com",
    replyTo: email,
    subject: `New Portfolio Query from ${name}`,
    text: `
      Name: ${name}
      Email: ${email}
      Message: ${message}
    `,
    html: `
      <div style="font-family: sans-serif; padding: 20px; color: #333; max-width: 600px; margin: auto; border: 1px solid #eee; border-radius: 10px;">
        <h2 style="color: #10b981; border-bottom: 2px solid #10b981; padding-bottom: 10px;">New Portfolio Query</h2>
        <p style="font-size: 16px;"><strong>Name:</strong> ${name}</p>
        <p style="font-size: 16px;"><strong>Email:</strong> ${email}</p>
        <div style="margin-top: 20px; padding: 20px; background: #f4f4f4; border-left: 5px solid #10b981; border-radius: 5px;">
          <p style="font-weight: bold; margin-bottom: 10px;">Message:</p>
          <p style="white-space: pre-wrap; line-height: 1.6;">${message}</p>
        </div>
        <p style="margin-top: 30px; font-size: 12px; color: #888; text-align: center;">Sent from your Portfolio Website</p>
      </div>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully:", info.messageId);
    return { success: true };
  } catch (error: any) {
    console.error("DETAILED EMAIL ERROR:", {
      message: error.message,
      code: error.code,
      command: error.command,
      response: error.response
    });
    return { success: false, error: error.message || "Failed to send email" };
  }
}
