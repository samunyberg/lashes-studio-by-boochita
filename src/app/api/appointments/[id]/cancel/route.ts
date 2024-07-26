import prisma from '@/prisma/client';
import { NextRequest, NextResponse } from 'next/server';

interface Props {
  params: {
    id: string;
  };
}

export async function PATCH(request: NextRequest, { params }: Props) {
  const appointmentId = parseInt(params.id);

  const appointment = await prisma.appointment.findUnique({
    where: { id: appointmentId },
  });

  if (!appointment)
    return NextResponse.json({ error: 'Invalid appointment' }, { status: 404 });

  try {
    const cancelledAppointment = await prisma.appointment.update({
      where: { id: appointmentId },
      data: {
        userId: null,
        serviceId: null,
        serviceOptionId: null,
        servicePrice: null,
        status: 'AVAILABLE',
        adminNote: null,
        bookedAt: null,
        rescheduledAt: null,
      },
    });
    return NextResponse.json({ data: cancelledAppointment }, { status: 200 });
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json(
      { error: 'Something went wrong.' },
      { status: 500 }
    );
  }
}
