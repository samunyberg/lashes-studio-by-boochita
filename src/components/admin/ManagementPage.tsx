'use client';

import { ReactNode } from 'react';
import Container from '../common/Container';
import GoBackLink from '../common/GoBackLink';

interface Props {
  children: ReactNode;
  heading: string | ReactNode;
}

const ManagementPage = ({ children, heading }: Props) => {
  return (
    <Container className='pb-8'>
      <GoBackLink />
      <h1 className='my-5 text-xl font-semibold'>{heading}</h1>
      <div className='flex flex-col gap-5'>{children}</div>
    </Container>
  );
};

export default ManagementPage;
