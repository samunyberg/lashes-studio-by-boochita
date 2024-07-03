import useLanguage from '@/hooks/useLanguage';
import { z } from 'zod';

const useRegisterFormSchema = () => {
  const { getLabel } = useLanguage();

  const registerFormSchema = z
    .object({
      email: z.string().email(getLabel('invalid_email')),
      password: z
        .string()
        .min(8, getLabel('password_min_length'))
        .max(50, getLabel('password_max_length'))
        .regex(
          new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).+$'),
          getLabel('password_requirements')
        ),
      confirmPassword: z.string(),
      firstName: z
        .string()
        .min(3, getLabel('first_name_too_short'))
        .max(50, getLabel('first_name_too_long')),
      lastName: z
        .string()
        .min(3, getLabel('last_name_too_short'))
        .max(50, getLabel('last_name_too_long')),
      phone: z
        .string()
        .regex(new RegExp('^\\d{10}$'), getLabel('invalid_phone')),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: getLabel('passwords_do_not_match'),
      path: ['confirmPassword'],
    });

  return registerFormSchema;
};

export default useRegisterFormSchema;

