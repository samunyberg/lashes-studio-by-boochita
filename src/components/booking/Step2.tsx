import BookingDataContext from '@/contexts/bookingDataContext';
import { BookingData, ServiceWithServiceOptions } from '@/lib/types';
import type { Service, ServiceOption } from '@prisma/client';
import { useContext, useState } from 'react';
import ServiceListItem from './ServiceListItem';

interface Props {
  services: ServiceWithServiceOptions[];
}

const Step2 = ({ services }: Props) => {
  const { bookingData, setBookingData } = useContext(BookingDataContext);
  const [expandedService, setExpandedService] = useState<Service | null>(
    bookingData.service || null
  );
  const [selectedServiceOption, setSelectedServiceOption] =
    useState<ServiceOption | null>(bookingData.serviceOption || null);

  const handleServiceSelect = (service: Service) => {
    if (service.id === expandedService?.id) return;

    // Functional state updates are used here to ensure the booking data gets updated with the most recent data.
    setBookingData((currentData: BookingData) => {
      return { ...currentData, serviceOption: null };
    });
    setSelectedServiceOption(null);

    setBookingData((currentData: BookingData) => {
      return { ...currentData, service };
    });
    setExpandedService(service);
  };

  const handleServiceOptionSelect = (option: ServiceOption) => {
    setBookingData({ ...bookingData, serviceOption: option });
    setSelectedServiceOption(option);
  };

  return (
    <div className='flex flex-col gap-2'>
      {services.map((service) => (
        <ServiceListItem
          key={service.id}
          service={service}
          selectedServiceOption={selectedServiceOption}
          isExpanded={expandedService?.id === service.id}
          onServiceSelect={handleServiceSelect}
          onServiceOptionSelect={handleServiceOptionSelect}
        />
      ))}
    </div>
  );
};

export default Step2;
