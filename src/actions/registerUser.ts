'use server';

import bcrypt from 'bcrypt';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import prisma from '../prisma/client';

interface RegisterFormState {
  errors: {
    _form?: string[];
    firstName?: string[];
    lastName?: string[];
    email?: string[];
    password?: string[];
    confirmPassword?: string[];
    phone?: string[];
  };
}

const registerFormSchema = z
  .object({
    email: z.string().email('Invalid email.'),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters long.')
      .max(50, 'Password cannot be over 50 characters long.')
      .regex(
        new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).+$'),
        'Password must contain at least one uppercase letter, one lowercase letter, and one digit.'
      ),
    confirmPassword: z.string(),
    firstName: z
      .string()
      .min(3, 'First name must be at least 3 characters long.')
      .max(50, 'First name cannot be over 50 characters long.'),
    lastName: z
      .string()
      .min(3, 'Last name must be at least 3 characters long.')
      .max(50, 'Last name cannot be over 50 characters long.'),
    phone: z
      .string()
      .regex(
        new RegExp('^\\d{10}$'),
        'Please give a valid phone number without the country code.'
      ),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match.",
    path: ['confirmPassword'],
  });

export default async function register(
  formState: RegisterFormState,
  formData: FormData
): Promise<RegisterFormState> {
  const firstName = formData.get('firstName') as string;
  const lastName = formData.get('lastName') as string;
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const confirmPassword = formData.get('confirmPassword') as string;
  const phone = formData.get('phone') as string;

  const result = registerFormSchema.safeParse({
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    phone,
  });
  if (!result.success) return { errors: result.error.flatten().fieldErrors };

  if (password !== confirmPassword)
    return { errors: { _form: ['Passwords do not match'] } };

  const user = await prisma.user.findFirst({ where: { email } });
  if (user)
    return { errors: { _form: ['User with this email already exists.'] } };

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await prisma.user.create({
      data: {
        email,
        hashedPassword,
        firstName,
        lastName,
        phone,
      },
    });
  } catch (error: unknown) {
    if (error instanceof Error) return { errors: { _form: [error.message] } };
    else return { errors: { _form: ['An unexpected error occured.'] } };
  }

  redirect('/auth/login?registrationSuccess=true');
}
