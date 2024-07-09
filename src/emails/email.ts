import { Resend } from 'resend';
import ConfirmationTemplate from './ConfirmationTemplate';

const resend = new Resend(process.env.RESEND_API_KEY);

interface ConfirmationEmailArgs {
  to: string;
  date: string;
  time: string;
  service: string;
  serviceOption: string;
}

export async function sendBookingConfirmationEmail({
  to,
  date,
  time,
  service,
  serviceOption,
}: ConfirmationEmailArgs) {
  await resend.emails.send({
    from: 'no-reply@lashesstudiobyboochita.com',
    to,
    subject: 'Booking Confirmed',
    text: 'Your booking is confirmed.',
    react: ConfirmationTemplate({
      date,
      time,
      service,
      serviceOption,
    }),
  });
}

export async function sendResetEmail(email: string, resetUrl: string) {
  const message = {
    from: 'no-reply@lashesstudiobyboochita.com',
    to: email,
    subject: 'Password Reset Request',
    html: `<p>You requested a password reset. Click the link below to reset your password:</p>
           <a href="${resetUrl}">${resetUrl}</a>`,
  };

  await resend.emails.send(message);
}
