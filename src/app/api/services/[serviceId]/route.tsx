import prisma from '@/prisma/client';
import { NextRequest, NextResponse } from 'next/server';

interface Props {
  params: { serviceId: string };
}

export async function PATCH(
  req: NextRequest,
  { params: { serviceId } }: Props
) {
  const body = await req.json();

  const id = parseInt(serviceId);

  const service = await prisma.service.findFirst({
    where: { id },
  });

  if (!service)
    return NextResponse.json({ error: 'Invalid service.' }, { status: 404 });

  try {
    const updatedService = await prisma.service.update({
      where: { id },
      data: {
        name: body.name,
        description_en: body.description_en,
        description_fi: body.description_fi,
        imageUrl: body.imageId,
      },
    });
    return NextResponse.json({ data: updatedService }, { status: 200 });
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
  { params: { serviceId } }: Props
) {
  const id = parseInt(serviceId);

  const service = await prisma.service.findFirst({
    where: { id },
  });

  if (!service)
    return NextResponse.json({ error: 'Invalid service.' }, { status: 404 });

  try {
    const deletedService = await prisma.service.delete({
      where: { id },
    });
    return NextResponse.json({ id: deletedService.id }, { status: 200 });
  } catch (error: unknown) {
    if (error instanceof Error)
      return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json(
      { error: 'An unexpected error occured.' },
      { status: 500 }
    );
  }
}
