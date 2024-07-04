import type { ServiceWithServiceOptions } from '@/app/book/page';
import type { Service, ServiceOption } from '@prisma/client';
import { FaCircleChevronDown, FaCircleChevronRight } from 'react-icons/fa6';
import CheckBox from '../common/CheckBox';
import Label from '../common/Label';

interface Props {
  service: ServiceWithServiceOptions;
  selectedServiceOption: ServiceOption | null;
  isExpanded: boolean;
  onServiceSelect: (service: Service) => void;
  onServiceOptionSelect: (option: ServiceOption) => void;
}

const ServiceListItem = ({
  service,
  selectedServiceOption,
  isExpanded,
  onServiceSelect,
  onServiceOptionSelect,
}: Props) => {
  return (
    <div key={service.id} className='shadow'>
      <div
        className='flex w-full items-center justify-between border-l-4 border-accent bg-bgSoft p-2 tracking-wide'
        onClick={() => onServiceSelect(service)}
      >
        <h2 className={`${isExpanded ? 'font-semibold' : 'font-medium'}`}>
          {service.name}
        </h2>
        {!isExpanded ? (
          <div className='flex items-center gap-2 text-xs'>
            <Label labelId='select' />
            <FaCircleChevronRight />
          </div>
        ) : (
          <div className='flex items-center gap-2 text-xs'>
            <Label labelId='select_option' />
            <FaCircleChevronDown />
          </div>
        )}
      </div>
      <div
        className={`${!isExpanded ? 'h-0 overflow-hidden' : 'h-auto'} border-l-4 border-accent bg-bgSoft`}
      >
        <div className='p-2 text-sm'>
          {service.serviceOptions.map((option) => (
            <div
              key={option.id}
              className='flex items-center justify-between border-b border-accent p-2 last:border-none'
              onClick={() => onServiceOptionSelect(option)}
            >
              <div className='flex w-full flex-col gap-1 px-1'>
                <div className='flex items-center justify-between'>
                  <span className='w-fit rounded-sm bg-accent px-2 font-medium tracking-wide text-white shadow'>
                    {option.name}
                  </span>
                  <CheckBox
                    className='size-4'
                    isChecked={selectedServiceOption?.id === option.id}
                  />
                </div>
                <span className='text-sm'>{option.description}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServiceListItem;
