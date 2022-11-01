import { PolarArea } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

const PieChart = ({ chartData }) => {
  return <PolarArea data={chartData} />;
};

export default PieChart;
