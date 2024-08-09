'use client';

import Button from '@/components/common/Button';
import {
  CldUploadWidget,
  CloudinaryUploadWidgetResults,
} from 'next-cloudinary';

interface CloudinaryResult {
  public_id: string;
}

interface Props {
  onImageSelect: (imageId: string) => void;
}

const UploadImage = ({ onImageSelect }: Props) => {
  const uploadImage = (result: CloudinaryUploadWidgetResults) => {
    if (result.event !== 'success') return;

    const info = result.info as CloudinaryResult;
    onImageSelect(info.public_id);
  };

  return (
    <div className='flex flex-col'>
      <CldUploadWidget
        uploadPreset='mvvia4vl'
        options={{
          sources: ['local'],
          multiple: false,
          showAdvancedOptions: false,
        }}
        onSuccess={(result) => uploadImage(result)}
      >
        {({ open }) => (
          <Button type='button' onClick={() => open()}>
            Upload image
          </Button>
        )}
      </CldUploadWidget>
    </div>
  );
};

export default UploadImage;
