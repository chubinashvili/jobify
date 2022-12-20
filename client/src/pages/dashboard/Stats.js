import { Fragment, useEffect } from 'react';
import { showStats } from '../../store/stats/statsSlice';
import { useSelector, useDispatch } from 'react-redux';
import { StatsContainer, Loading, ChartsContainer } from '../../components';

const Stats = () => {
  const dispatch = useDispatch();
  const { monthlyApplications } = useSelector(
    state => state.stats,
  );
  const { isLoading } = useSelector(
    state => state.alerts,
  );

  useEffect(() => {
    showStats(dispatch);
    // eslint-disable-next-line
  }, []);

  if (isLoading) {
    return <Loading center />;
  }
  return (
    <Fragment>
      <StatsContainer />
      {monthlyApplications.length > 0 && <ChartsContainer />}
    </Fragment>
  )
}
export default Stats