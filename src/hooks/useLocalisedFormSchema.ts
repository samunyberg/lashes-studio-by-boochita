import useLanguage from '@/hooks/useLanguage';
import { z } from 'zod';

const useLocalisedFormSchema = () => {
  const { getLabel } = useLanguage();

  const validPhone = new RegExp('^\\d{10}$');
  const validPassword = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).+$');

  const registerFormSchema = z
    .object({
      email: z.string().email(getLabel('invalid_email')),
      password: z
        .string()
        .min(8, getLabel('password_min_length'))
        .max(50, getLabel('password_max_length'))
        .regex(validPassword, getLabel('password_requirements')),
      confirmPassword: z.string(),
      firstName: z
        .string()
        .min(3, getLabel('first_name_too_short'))
        .max(50, getLabel('first_name_too_long')),
      lastName: z
        .string()
        .min(3, getLabel('last_name_too_short'))
        .max(50, getLabel('last_name_too_long')),
      phone: z.string().regex(validPhone, getLabel('invalid_phone')),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: getLabel('passwords_do_not_match'),
      path: ['confirmPassword'],
    });

  const editAccountSchema = z.object({
    email: z.string().email(getLabel('invalid_email')),
    firstName: z
      .string()
      .min(3, getLabel('first_name_too_short'))
      .max(50, getLabel('first_name_too_long')),
    lastName: z
      .string()
      .min(3, getLabel('last_name_too_short'))
      .max(50, getLabel('last_name_too_long')),
    phone: z.string().regex(validPhone, getLabel('invalid_phone')),
  });

  const forgottenPasswordFormSchema = z.object({
    email: z.string().email(`${getLabel('invalid_email')}`),
  });

  const resetPasswordFormSchema = z
    .object({
      password: z
        .string()
        .min(8, getLabel('password_min_length'))
        .max(50, getLabel('password_max_length'))
        .regex(validPassword, getLabel('password_requirements')),
      confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: getLabel('passwords_do_not_match'),
      path: ['confirmPassword'],
    });

  const changePasswordFormSchema = z
    .object({
      oldPassword: z.string(),
      newPassword: z
        .string()
        .min(8, getLabel('password_min_length'))
        .max(50, getLabel('password_max_length'))
        .regex(validPassword, getLabel('password_requirements')),
      confirmNewPassword: z.string(),
    })
    .refine((data) => data.newPassword === data.confirmNewPassword, {
      message: getLabel('passwords_do_not_match'),
      path: ['confirmNewPassword'],
    });

  const adminNoteSchema = z.object({
    adminNote: z.string().min(3).max(500),
  });

  const serviceSchema = z.object({
    name: z.string().min(3).max(50),
    description_en: z.string().min(3).max(255),
    description_fi: z.string().min(3).max(255),
  });

  const serviceOptionSchema = z.object({
    name_en: z.string().min(3).max(50),
    name_fi: z.string().min(3).max(50),
    description_en: z.string().min(3).max(255),
    description_fi: z.string().min(3).max(255),
    price: z.number().min(1).max(500),
  });

  return {
    registerFormSchema,
    editAccountSchema,
    forgottenPasswordFormSchema,
    resetPasswordFormSchema,
    changePasswordFormSchema,
    adminNoteSchema,
    serviceSchema,
    serviceOptionSchema,
  };
};

export default useLocalisedFormSchema;
