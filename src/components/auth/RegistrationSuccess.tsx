import Label from '../common/Label';

const RegistrationSuccess = () => {
  return (
    <div className='mb-6 flex flex-col items-center justify-center gap-2 rounded-md border-2 border-green-400 bg-white px-1 py-4 text-center'>
      <p className='text-md'>
        <Label labelId='registration_success' />
      </p>
      <p className='text-sm'>
        <Label labelId='welcome' />
      </p>
    </div>
  );
};

export default RegistrationSuccess;
