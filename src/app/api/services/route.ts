import prisma from '@/prisma/client';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const body = await req.json();

  const existingService = await prisma.service.findFirst({
    where: { name: body.name },
  });

  if (existingService)
    return NextResponse.json(
      { error: 'This service already exists' },
      { status: 409 }
    );

  try {
    const service = await prisma.service.create({
      data: {
        name: body.name,
        description: body.description,
        imageUrl: body.imageId,
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
