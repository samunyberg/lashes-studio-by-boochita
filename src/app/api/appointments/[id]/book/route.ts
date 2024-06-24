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

  const appointment = await prisma.appointment.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!appointment)
    return NextResponse.json({ error: 'Invalid appointment' }, { status: 404 });

  const currentTime = new Date();
  const oneHourInMS = 3_600_000;
  if (appointment.dateTime.getTime() - currentTime.getTime() < oneHourInMS)
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

  const validation = appointmentSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  try {
    const bookedAppointment = await prisma.appointment.update({
      where: { id: appointment.id },
      data: {
        userId: body.userId,
        serviceId: body.serviceId,
        serviceOptionId: body.serviceOptionId,
        status: 'BOOKED',
        bookedAt: new Date(),
      },
    });

    return NextResponse.json(bookedAppointment);
  } catch (error) {
    return NextResponse.json({ status: 500 });
  }
}
