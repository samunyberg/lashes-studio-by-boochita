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
    const bookedAppointment = await prisma.$transaction(async (prisma) => {
      const appointment = await prisma.appointment.findUnique({
        where: { id: appointmentId },
      });

      if (!appointment) {
        throw new Error('Invalid appointment');
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

      if (appointment.status === 'BOOKED') {
        throw new Error('This appointment is already booked');
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
    });

    // TODO: ENABLE EMAILS WHEN NEEDED:
    // const [user, service, serviceOption] = await Promise.all([
    //   prisma.user.findFirst({ where: { id: body.userId } }),
    //   prisma.service.findFirst({ where: { id: body.serviceId } }),
    //   prisma.serviceOption.findFirst({ where: { id: body.serviceOptionId } }),
    // ]);

    // if (user && service && serviceOption)
    //   await sendBookingConfirmationEmail({
    //     to: user!.email,
    //     date: appointment.dateTime.toLocaleDateString('fi-FI'),
    //     time: appointment.dateTime.toLocaleTimeString('fi-FI', {
    //       hour: '2-digit',
    //       minute: '2-digit',
    //     }),
    //     service: service!.name,
    //     serviceOption: serviceOption!.name,
    //   });

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
