import prisma from '@/prisma/client';
import { NextRequest, NextResponse } from 'next/server';

interface Props {
  params: {
    id: string;
  };
}

export async function PATCH(req: NextRequest, { params }: Props) {
  const body = await req.json();

  const user = await prisma.user.findFirst({
    where: { id: params.id },
  });

  if (!user)
    return NextResponse.json(
      { error: 'User does not exist.' },
      { status: 404 }
    );

  if (user.email !== body.email) {
    const userWithSameEmail = await prisma.user.findFirst({
      where: { email: body.email, id: { not: user.id } },
    });

    if (userWithSameEmail)
      return NextResponse.json(
        { error: 'Email is already in use.' },
        { status: 409 }
      );
  }

  try {
    await prisma.user.update({
      where: {
        id: user!.id,
      },
      data: {
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        phone: body.phone,
      },
    });
    return NextResponse.json(
      {
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        phone: body.phone,
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    if (error instanceof Error)
      return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json(
      { error: 'An unexpected error occured.' },
      { status: 500 }
    );
  }
}
