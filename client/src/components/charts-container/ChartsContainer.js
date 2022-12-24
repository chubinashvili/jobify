import { useState } from 'react';
import BarChart from '../bar-chart/BarChart';
import AreaChart from '../area-chart/AreaChart';
import { useSelector } from 'react-redux';
import Wrapper from '../../assets/wrappers/ChartsContainer';

const ChartsContainer = () => {
  const [barChart, setBarChart] = useState(true);
  const { monthlyApplications: data } = useSelector(
    state => state.stats,
  );
  return (
    <Wrapper>
      <h4>Monthly Applications</h4>

      <button type='button' onClick={() => setBarChart(!barChart)}>
        {barChart ? 'Area Chart' : 'Bar Chart'}
      </button>
      {barChart ? <BarChart data={data} /> : <AreaChart data={data} />}
    </Wrapper>
  )
}
export default ChartsContainer