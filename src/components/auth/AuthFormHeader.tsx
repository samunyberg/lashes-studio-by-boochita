import StrikeThroughText from '../common/StrikeThroughText';

const AuthFormHeader = ({ subtitle }: { subtitle: string }) => {
  return (
    <>
      <h1 className='text-center text-xl uppercase lg:text-2xl'>
        Lashes Studio by Boochita
      </h1>
      <StrikeThroughText className='my-6'>{subtitle}</StrikeThroughText>
    </>
  );
};

export default AuthFormHeader;
