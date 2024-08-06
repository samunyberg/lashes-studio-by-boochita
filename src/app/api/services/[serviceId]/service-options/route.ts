import prisma from '@/prisma/client';
import { NextRequest, NextResponse } from 'next/server';

interface Props {
  params: { serviceId: string };
}

export async function POST(req: NextRequest, { params: { serviceId } }: Props) {
  const body = await req.json();

  const id = parseInt(serviceId);

  const existingServiceOption = await prisma.serviceOption.findFirst({
    where: { serviceId: id, name_en: body.name_en },
  });

  if (existingServiceOption)
    return NextResponse.json(
      { error: 'This option already exists' },
      { status: 409 }
    );

  try {
    const service = await prisma.serviceOption.create({
      data: {
        serviceId: id,
        name_en: body.name_en,
        name_fi: body.name_fi,
        description_en: body.description_en,
        description_fi: body.description_fi,
        price: body.price,
      },
    });
    return NextResponse.json({ data: service }, { status: 201 });
  } catch (error: unknown) {
    if (error instanceof Error)
      return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json(
      { error: 'An unexpected error occured.' },
      { status: 500 }
    );
  }
}
