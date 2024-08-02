import prisma from '@/prisma/client';
import { NextRequest, NextResponse } from 'next/server';

interface Props {
  params: { id: string };
}

export async function POST(req: NextRequest, { params: { id } }: Props) {
  const body = await req.json();

  const serviceId = parseInt(id);

  const existingServiceOption = await prisma.serviceOption.findFirst({
    where: { serviceId, name: body.name },
  });

  if (existingServiceOption)
    return NextResponse.json(
      { error: 'This option already exists' },
      { status: 409 }
    );

  try {
    const service = await prisma.serviceOption.create({
      data: {
        serviceId,
        name: body.name,
        description: body.description,
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
