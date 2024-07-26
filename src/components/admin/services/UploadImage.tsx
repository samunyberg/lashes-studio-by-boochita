'use client';

import Button from '@/components/common/Button';
import {
  CldImage,
  CldUploadWidget,
  CloudinaryUploadWidgetResults,
} from 'next-cloudinary';

interface CloudinaryResult {
  public_id: string;
}

interface Props {
  imageId: string;
  onImageSelect: (id: string) => void;
}

const UploadImage = ({ imageId, onImageSelect }: Props) => {
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
            {imageId ? 'Change image' : 'Upload image'}
          </Button>
        )}
      </CldUploadWidget>
      {imageId && (
        <div className='mx-auto mt-5'>
          <CldImage
            src={imageId}
            alt='Style Image'
            width={150}
            height={150}
            className='rounded-sm object-cover shadow'
          />
        </div>
      )}
    </div>
  );
};

export default UploadImage;
