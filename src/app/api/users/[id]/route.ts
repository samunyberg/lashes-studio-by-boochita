import prisma from '@/prisma/client';
import _ from 'lodash';
import { NextRequest, NextResponse } from 'next/server';

interface Props {
  params: { id: string };
}

export async function PATCH(req: NextRequest, { params: { id } }: Props) {
  const body = await req.json();

  const user = await prisma.user.findFirst({
    where: { id },
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
    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        phone: body.phone,
      },
    });
    return NextResponse.json(
      {
        data: _.pick(updatedUser, ['email', 'firstName', 'lastName', 'phone']),
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

export async function DELETE(req: NextRequest, { params: { id } }: Props) {
  const user = await prisma.user.findFirst({ where: { id } });

  if (!user)
    return NextResponse.json({ error: 'Invalid user.' }, { status: 400 });

  if (user.isAdmin)
    return NextResponse.json(
      { error: 'Admin user cannot be deleted.' },
      { status: 400 }
    );

  try {
    const deletedUser = await prisma.user.delete({ where: { id } });
    return NextResponse.json({ id: deletedUser.id }, { status: 200 });
  } catch (error: unknown) {
    if (error instanceof Error)
      return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json(
      { error: 'An unexpected error occured.' },
      { status: 500 }
    );
  }
}
