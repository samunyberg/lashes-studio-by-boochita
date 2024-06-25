import { Resend } from 'resend';
import ConfirmationTemplate from './ConfirmationTemplate';

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
  const resend = new Resend(process.env.RESEND_API_KEY);
  resend.emails.send({
    from: 'confirmation@lashesstudiobyboochita.com',
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
