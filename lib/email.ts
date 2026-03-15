import nodemailer from 'nodemailer';
import { google } from 'googleapis';

const oAuth2Client = new google.auth.OAuth2(
  process.env.GMAIL_CLIENT_ID,
  process.env.GMAIL_CLIENT_SECRET,
  'https://developers.google.com/oauthplayground' // This is a redirect URI for getting refresh tokens, not used in production for direct sending
);

oAuth2Client.setCredentials({
  refresh_token: process.env.GMAIL_REFRESH_TOKEN,
});

export async function sendVerificationEmail(to: string, code: string) {
  try {
    const accessToken = await oAuth2Client.getAccessToken();

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: 'your-gmail-account@gmail.com', // Replace with your actual sender email
        clientId: process.env.GMAIL_CLIENT_ID,
        clientSecret: process.env.GMAIL_CLIENT_SECRET,
        refreshToken: process.env.GMAIL_REFRESH_TOKEN,
        accessToken: accessToken.token as string,
      },
    });

    const mailOptions = {
      from: 'MoldMD Support <your-gmail-account@gmail.com>', // Replace with your actual sender email
      to,
      subject: 'MoldMD: Your One-Time Verification Code',
      html: `
        <p>Hello,</p>
        <p>Your one-time verification code for MoldMD is: <strong>${code}</strong></p>
        <p>This code is valid for 10 minutes.</p>
        <p>If you did not request this, please ignore this email.</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`Verification email sent to ${to}`);
  } catch (error) {
    console.error('Error sending verification email:', error);
    throw new Error('Failed to send verification email');
  }
}
