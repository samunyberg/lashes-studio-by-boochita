import { useEffect, useState } from 'react';
import { z } from 'zod';
import Input from '../common/Input';

export interface ContactInfoFormData {
  name: string;
  email: string;
  phone: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
}

interface Props {
  data: ContactInfoFormData;
  onChange: (data: ContactInfoFormData) => void;
}

export const formSchema = z.object({
  name: z
    .string()
    .min(3, 'Name must be at least 3 characters long.')
    .max(50, 'Name cannot be over 50 characters long.'),
  email: z.string().email('Invalid email.'),
  phone: z
    .string()
    .regex(
      new RegExp('^\\d{10}$'),
      'Please give a valid phone number without the country code.'
    ),
});

const Step3 = ({ data: contactInfoFormData, onChange }: Props) => {
  const [errors, setErrors] = useState<FormErrors>({});

  useEffect(() => {
    const result = formSchema.safeParse(contactInfoFormData);
    if (!result.success) {
      setErrors({
        name: result.error.format().name?._errors[0],
        email: result.error.format().email?._errors[0],
        phone: result.error.format().phone?._errors[0],
      });
    } else setErrors({});
  }, [contactInfoFormData]);

  return (
    <form className='flex flex-col gap-3'>
      <Input
        name='name'
        label='Name'
        placeholder='First and last name'
        value={contactInfoFormData.name}
        onChange={(event) =>
          onChange({
            ...contactInfoFormData,
            name: event.target.value,
          })
        }
        error={errors.name}
      />
      <Input
        name='email'
        label='Email'
        placeholder='Email'
        value={contactInfoFormData.email}
        onChange={(event) =>
          onChange({
            ...contactInfoFormData,
            email: event.target.value,
          })
        }
        error={errors.email}
      />
      <Input
        name='phone'
        label='Phone'
        placeholder='Phone number without country code'
        value={contactInfoFormData.phone}
        onChange={(event) =>
          onChange({
            ...contactInfoFormData,
            phone: event.target.value,
          })
        }
        error={errors.phone}
      />
      {/* <textarea
        name='comment'
        value={comment}
        maxLength={250}
        placeholder='Optional comment regarding your booking'
        onChange={(event) => setComment(event.target.value)}
        className={`h-24 rounded-sm p-2 shadow placeholder:text-sm focus:outline-2 focus:outline-accent`}
      /> */}
    </form>
  );
};

export default Step3;
