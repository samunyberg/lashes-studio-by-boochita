import prisma from '@/prisma/client';
import { NextRequest, NextResponse } from 'next/server';

interface Props {
  params: { serviceId: string; serviceOptionId: string };
}

export async function PATCH(
  req: NextRequest,
  { params: { serviceOptionId } }: Props
) {
  const body = await req.json();

  const id = parseInt(serviceOptionId);

  const serviceOption = await prisma.serviceOption.findFirst({
    where: { id },
  });

  if (!serviceOption)
    return NextResponse.json({ error: 'Invalid option.' }, { status: 404 });

  try {
    const service = await prisma.serviceOption.update({
      where: { id },
      data: {
        name_en: body.name_en,
        name_fi: body.name_fi,
        description_en: body.description_en,
        description_fi: body.description_fi,
        price: body.price,
      },
    });
    return NextResponse.json({ data: service }, { status: 200 });
  } catch (error: unknown) {
    if (error instanceof Error)
      return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json(
      { error: 'An unexpected error occured.' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _req: NextRequest,
  { params: { serviceOptionId } }: Props
) {
  const id = parseInt(serviceOptionId);

  const serviceOption = await prisma.serviceOption.findFirst({
    where: { id },
  });

  if (!serviceOption)
    return NextResponse.json({ error: 'Invalid option.' }, { status: 404 });

  try {
    const deletedServiceOption = await prisma.serviceOption.delete({
      where: { id },
    });
    return NextResponse.json({ id: deletedServiceOption.id }, { status: 200 });
  } catch (error: unknown) {
    if (error instanceof Error)
      return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json(
      { error: 'An unexpected error occured.' },
      { status: 500 }
    );
  }
}
