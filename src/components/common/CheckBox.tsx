'use client';

import { FaCheck } from 'react-icons/fa6';

interface Props {
  isChecked: boolean;
}

const CheckBox = ({ isChecked }: Props) => {
  return (
    <div
      className={`${
        isChecked && '!bg-accent'
      } flex size-5 cursor-pointer items-center justify-center rounded-sm border border-primary bg-white/50 transition-all`}
    >
      {isChecked && <FaCheck className="scale-100 text-white" />}
    </div>
  );
};

export default CheckBox;
