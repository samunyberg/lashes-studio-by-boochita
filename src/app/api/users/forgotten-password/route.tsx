import { sendResetEmail } from '@/emails/email';
import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import prisma from '../../../../prisma/client';

export async function POST(req: NextRequest) {
  const body = await req.json();

  const user = await prisma.user.findFirst({
    where: { email: body.email },
  });

  if (!user)
    return NextResponse.json({ error: 'Invalid user.' }, { status: 404 });

  const token = uuidv4();
  await prisma.verificationToken.create({
    data: {
      identifier: body.email,
      token,
      expires: new Date(Date.now() + 3600 * 1000), // 1 hour expiry
    },
  });

  const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/auth/reset-password?token=${token}`;
  await sendResetEmail(body.email, resetUrl);

  return NextResponse.json(
    { message: 'Password reset email sent successfully.' },
    { status: 200 }
  );
}
