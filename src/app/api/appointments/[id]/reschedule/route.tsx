import { startsInLessThanOneHour } from '@/lib/utils/dateAndTimeUtils';
import prisma from '@/prisma/client';
import { NextRequest, NextResponse } from 'next/server';

interface Props {
  params: {
    id: string;
  };
}

export async function PATCH(req: NextRequest, { params: { id } }: Props) {
  const body = await req.json();
  const currentTime = new Date();

  const oldAppointmentId = parseInt(id);

  try {
    const bookedAppointment = await prisma.$transaction(
      async (prisma) => {
        const oldAppointment = await prisma.appointment.findUnique({
          where: { id: oldAppointmentId },
        });

        if (!oldAppointment) {
          throw new Error('Invalid appointment');
        }

        await prisma.appointment.update({
          where: { id: oldAppointmentId },
          data: {
            userId: null,
            serviceId: null,
            serviceOptionId: null,
            servicePrice: null,
            status: 'AVAILABLE',
            adminNote: null,
            bookedAt: null,
          },
        });

        const newAppointment = await prisma.appointment.findUnique({
          where: { id: body.newId },
        });

        if (!newAppointment) {
          throw new Error('Invalid appointment.');
        }

        if (newAppointment.status === 'BOOKED') {
          throw new Error('This appointment is already booked.');
        }

        if (startsInLessThanOneHour(newAppointment.dateTime)) {
          throw new Error(
            'Appointment must be booked at least one hour before start time.'
          );
        }

        return await prisma.appointment.update({
          where: { id: body.newId },
          data: {
            userId: body.userId,
            serviceId: body.serviceId,
            serviceOptionId: body.serviceOptionId,
            servicePrice: body.servicePrice,
            status: 'BOOKED',
            adminNote: body.adminNote,
            bookedAt: currentTime,
            rescheduledAt: currentTime,
          },
        });
      },
      { isolationLevel: 'Serializable' }
    );

    return NextResponse.json({ data: bookedAppointment }, { status: 200 });
  } catch (error: unknown) {
    let errorMessage = 'An unexpected error occurred.';
    if (error instanceof Error) {
      errorMessage = error.message;
      if (error.message === 'Invalid appointment.') {
        return NextResponse.json({ error: errorMessage }, { status: 400 });
      }
      if (error.message === 'This appointment is already booked.') {
        return NextResponse.json({ error: errorMessage }, { status: 409 });
      }
      if (
        error.message ===
        'Appointment must be booked at least one hour before start time.'
      ) {
        return NextResponse.json({ error: errorMessage }, { status: 403 });
      }
    }
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
