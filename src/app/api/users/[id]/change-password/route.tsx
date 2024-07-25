import bcrypt from 'bcrypt';
import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../../../prisma/client';

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

  const isValidPassword = await bcrypt.compare(
    body.oldPassword,
    user.hashedPassword
  );

  if (!isValidPassword)
    return NextResponse.json({ error: 'Invalid password' }, { status: 400 });

  if (body.password !== body.confirmPassword)
    return NextResponse.json(
      { error: 'Passwords no not match' },
      { status: 400 }
    );

  const hashedPassword = await bcrypt.hash(body.password, 10);

  try {
    await prisma.user.update({
      where: {
        id: user!.id,
      },
      data: {
        hashedPassword,
      },
    });
    return NextResponse.json(
      {
        message: 'Password changed successfully.',
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
