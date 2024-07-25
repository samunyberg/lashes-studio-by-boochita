import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/prisma/client';

interface Props {
  params: { id: string };
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
    return NextResponse.json({ data: deletedUser }, { status: 200 });
  } catch (error: unknown) {
    if (error instanceof Error)
      return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json(
      { error: 'An unexpected error occured.' },
      { status: 500 }
    );
  }
}
