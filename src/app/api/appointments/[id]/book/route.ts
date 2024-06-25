import { sendBookingConfirmationEmail } from '@/emails/email';
import prisma from '@/prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

export const appointmentSchema = z.object({
  userId: z.string(),
  serviceId: z.number({ invalid_type_error: 'This field is required.' }),
  serviceOptionId: z.number({ invalid_type_error: 'This field is required.' }),
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

  const appointment = await prisma.appointment.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!appointment)
    return NextResponse.json({ error: 'Invalid appointment' }, { status: 404 });

  const startsInLessThanOneHour = () => {
    const oneHourInMS = 3_600_000;
    return appointment.dateTime.getTime() - currentTime.getTime() < oneHourInMS;
  };

  if (startsInLessThanOneHour())
    return NextResponse.json(
      {
        error: 'Appointment must be booked at least one hour before start time',
      },
      { status: 403 }
    );

  if (appointment.status === 'BOOKED')
    return NextResponse.json(
      { error: 'This appointment is already booked' },
      { status: 409 }
    );

  try {
    const bookedAppointment = await prisma.appointment.update({
      where: { id: appointment.id },
      data: {
        userId: body.userId,
        serviceId: body.serviceId,
        serviceOptionId: body.serviceOptionId,
        status: 'BOOKED',
        bookedAt: currentTime,
      },
    });

    const [user, service, serviceOption] = await Promise.all([
      prisma.user.findFirst({ where: { id: body.userId } }),
      prisma.service.findFirst({ where: { id: body.serviceId } }),
      prisma.serviceOption.findFirst({ where: { id: body.serviceOptionId } }),
    ]);

    if (user && service && serviceOption)
      await sendBookingConfirmationEmail({
        to: user!.email,
        date: appointment.dateTime.toLocaleDateString('fi-FI'),
        time: appointment.dateTime.toLocaleTimeString('fi-FI', {
          hour: '2-digit',
          minute: '2-digit',
        }),
        service: service!.name,
        serviceOption: serviceOption!.name,
      });

    return NextResponse.json(bookedAppointment);
  } catch (error) {
    return NextResponse.json({ status: 500 });
  }
}
