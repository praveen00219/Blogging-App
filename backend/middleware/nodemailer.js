import "dotenv/config";
import nodemailer from "nodemailer";
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export const sendEmailForVerification = async (email, token) => {
  const verificationLink = `${process.env.FRONTEND_URL}/verify-token?token=${token}`;
  const options = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Verify Your Email",
    html: `<table width="100%" style="background-color: #f9f9f9; padding: 20px;">
        <tr>
            <td align="center">
                <table width="600" style="background-color: #ffffff; border: 1px solid #ddd; border-radius: 8px; padding: 20px;">
                    <tr>
                        <td style="padding: 20px; text-align: center;">
                            <h1 style="color: #333; font-size: 24px; margin-bottom: 10px;">Verify Your Email Address</h1>
                            <p style="color: #666; font-size: 16px; line-height: 1.5;">Hi there,</p>
                            <p style="color: #666; font-size: 16px; line-height: 1.5;">Thank you for signing up! Please verify your email address by clicking the button below to complete your registration:</p>
                            <a href="${verificationLink}" target="_blank" style="display: inline-block; padding: 10px 20px; margin-top: 20px; background-color: #007BFF; color: #ffffff; text-decoration: none; font-size: 16px; border-radius: 5px;">Verify Email</a>
                            <p style="color: #999; font-size: 14px; margin-top: 20px;">If you did not sign up, you can safely ignore this email.</p>
                        </td>
                        <tr>
                            <td>
                                <p>This link will expire in 1hr.</p>
                            </td>
                        </tr>
                    </tr>
                    <tr>
                        <td style="text-align: center; padding: 20px; font-size: 12px; color: #666;">
                            &copy; 2024 Blogger. All rights reserved.
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
            </table>`,
  };
  await transporter.sendMail(options);
};

export const sendFileLink = async (email, link) => {
  const options = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "file",
    html: `<table width="100%" style="background-color: #f9f9f9; padding: 20px;">
        <tr>
            <td align="center">
                <table width="600" style="background-color: #ffffff; border: 1px solid #ddd; border-radius: 8px; padding: 20px;">
                    <tr>
                        <td style="padding: 20px; text-align: center;">
                            <h1 style="color: #333; font-size: 24px; margin-bottom: 10px;">Below is the File Link</h1>
                            <p style="color: #666; font-size: 16px; line-height: 1.5;">Hi there,</p>
                            <p style="color: #666; font-size: 16px; line-height: 1.5;">Please access the file by clicking the button below .</p>
                            <a href="${link}" target="_blank" style="display: inline-block; padding: 10px 20px; margin-top: 20px; background-color: #007BFF; color: #ffffff; text-decoration: none; font-size: 16px; border-radius: 5px;">Download</a>
                            <p style="color: #999; font-size: 14px; margin-top: 20px;">Enjoy.</p>
                        </td>
                    </tr>
                    <tr>
                        <td style="text-align: center; padding: 20px; font-size: 12px; color: #666;">
                            &copy; 2024 fileSharingApp. All rights reserved.
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
            </table>`,
  };
  await transporter.sendMail(options);
};
