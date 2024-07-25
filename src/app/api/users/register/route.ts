import bcrypt from 'bcrypt';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import prisma from '../../../../prisma/client';

const registerFormSchema = z
  .object({
    email: z.string().email(),
    password: z
      .string()
      .min(8)
      .max(50)
      .regex(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).+$')),
    confirmPassword: z.string(),
    firstName: z.string().min(3).max(50),
    lastName: z.string().min(3).max(50),
    phone: z.string().regex(new RegExp('^\\d{10}$')),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
  });

export async function POST(req: NextRequest) {
  const body = await req.json();

  const validationResult = registerFormSchema.safeParse(body);
  if (!validationResult.success)
    return NextResponse.json({ error: 'Invalid input.' }, { status: 400 });

  if (body.password !== body.confirmPassword)
    return NextResponse.json(
      { error: 'Passwords do not match.' },
      { status: 400 }
    );

  const existingUser = await prisma.user.findFirst({
    where: { email: body.email },
  });
  if (existingUser)
    return NextResponse.json(
      { error: 'User with this email already exists.' },
      {
        status: 409,
      }
    );

  const hashedPassword = await bcrypt.hash(body.password, 10);

  try {
    const newUser = await prisma.user.create({
      data: {
        email: body.email,
        hashedPassword,
        firstName: body.firstName,
        lastName: body.lastName,
        phone: body.phone,
      },
    });
    return NextResponse.json(newUser.id, { status: 201 });
  } catch (error: unknown) {
    if (error instanceof Error)
      return NextResponse.json({ error: error.message }, { status: 500 });
    else
      return NextResponse.json(
        { error: 'An unexpected error occured.' },
        { status: 500 }
      );
  }
}
