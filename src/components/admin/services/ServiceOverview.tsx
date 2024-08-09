'use client';

import Spacer from '@/components/common/Spacer';
import { ServiceWithServiceOptions } from '@/lib/types';
import ManagementPage from '../ManagementPage';
import ServiceDetails from './ServiceDetails';
import ServiceOptions from './ServiceOptions';

interface Props {
  service: ServiceWithServiceOptions;
}

const ServiceOverview = ({ service }: Props) => {
  return (
    <ManagementPage heading='Manage Service'>
      <ServiceDetails service={service} />
      <Spacer />
      <ServiceOptions serviceId={service.id} options={service.serviceOptions} />
      <Spacer />
    </ManagementPage>
  );
};

export default ServiceOverview;
