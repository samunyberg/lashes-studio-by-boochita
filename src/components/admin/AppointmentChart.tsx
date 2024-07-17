import Chart from './Chart';
import ChartHeader from './ChartHeader';

interface Props {
  fetchData: () => Promise<{ month: string; count: number }[]>;
}

const AppointmentLineChart = async ({ fetchData }: Props) => {
  const data = await fetchData();

  return (
    <div className='h-full'>
      <ChartHeader />
      <Chart data={data} />
    </div>
  );
};

export default AppointmentLineChart;
