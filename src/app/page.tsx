import Intro from '@/components/Intro';

export default function Home() {
  return (
    <div className='snap-y snap-mandatory'>
      <div className='h-[calc(100vh-3.5rem)] snap-start'>
        <Intro />
      </div>
      <div className='h-[calc(100vh-3.5rem)] snap-start bg-bgSoft'>
        <div className='container mx-auto'>Instagram Section</div>
      </div>
    </div>
  );
}
