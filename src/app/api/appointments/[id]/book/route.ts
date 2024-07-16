import { formatDate, formatTime } from '@/app/lib/dates';
import { sendBookingConfirmationEmail } from '@/emails/email';
import prisma from '@/prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

export const appointmentSchema = z.object({
  userId: z.string(),
  serviceId: z.number({ invalid_type_error: 'This field is required.' }),
  serviceOptionId: z.number({ invalid_type_error: 'This field is required.' }),
  servicePrice: z.number({ invalid_type_error: 'This field is required.' }),
});

interface Props {
  params: {
    id: string;
  };
}

export async function PATCH(request: NextRequest, { params }: Props) {
  const body = await request.json();
  const currentTime = new Date();

  const validation = appointmentSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  const appointmentId = parseInt(params.id);

  try {
    const bookedAppointment = await prisma.$transaction(
      async (prisma) => {
        const appointment = await prisma.appointment.findUnique({
          where: { id: appointmentId },
        });

        if (!appointment) {
          throw new Error('Invalid appointment');
        }

        if (appointment.status === 'BOOKED') {
          throw new Error('This appointment is already booked');
        }

        const startsInLessThanOneHour = () => {
          const oneHourInMS = 3_600_000;
          return (
            appointment.dateTime.getTime() - currentTime.getTime() < oneHourInMS
          );
        };

        if (startsInLessThanOneHour()) {
          throw new Error(
            'Appointment must be booked at least one hour before start time'
          );
        }

        return await prisma.appointment.update({
          where: { id: appointmentId },
          data: {
            userId: body.userId,
            serviceId: body.serviceId,
            serviceOptionId: body.serviceOptionId,
            servicePrice: body.servicePrice,
            status: 'BOOKED',
            bookedAt: currentTime,
          },
        });
      },
      { isolationLevel: 'Serializable' }
    );

    const [user, service, serviceOption] = await Promise.all([
      prisma.user.findUnique({
        where: { id: body.userId },
      }),
      prisma.service.findUnique({ where: { id: body.serviceId } }),
      prisma.serviceOption.findUnique({ where: { id: body.serviceOptionId } }),
    ]);

    if (user)
      await sendBookingConfirmationEmail({
        to: user.email,
        date: formatDate(bookedAppointment.dateTime, 'en-FI'),
        time: formatTime(bookedAppointment.dateTime, 'en-FI'),
        service: service?.name || 'Unknown Service',
        serviceOption: serviceOption?.name || 'Unknown Option',
      });

    return NextResponse.json(bookedAppointment);
  } catch (error: unknown) {
    if (error instanceof Error)
      return NextResponse.json({ error: error.message }, { status: 500 });
    else
      return NextResponse.json(
        { error: 'An unexpected error occured.' },
        { status: 500 }
      );
  }
}
