import prisma from '@/prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

export const appointmentSchema = z.object({
  serviceId: z.number({ invalid_type_error: 'This field is required.' }),
  serviceOptionId: z.number({ invalid_type_error: 'This field is required.' }),
  clientName: z
    .string()
    .min(3, 'Name should be at least 3 characters.')
    .max(55, 'Name should not be longer than 55 characters.'),
  clientEmail: z.string().email('Please give a valid email.'),
  clientPhone: z
    .string()
    .min(
      10,
      'Please give a valid phone number. Do not include the country code.'
    )
    .max(10),
  comment: z
    .string()
    .max(255, 'Comment should not be longer than 255 characters.')
    .optional()
    .nullable(),
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
        serviceId: body.serviceId,
        serviceOptionId: body.serviceOptionId,
        clientName: body.clientName,
        clientEmail: body.clientEmail,
        clientPhone: body.clientPhone,
        status: 'BOOKED',
      },
    });

    return NextResponse.json(bookedAppointment);
  } catch (error) {
    return NextResponse.json({ status: 500 });
  }
}
