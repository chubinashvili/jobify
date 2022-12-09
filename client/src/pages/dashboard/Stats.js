import { Fragment, useEffect } from 'react';
import { useAppContext } from '../../context/appContext';
import { StatsContainer, Loading, ChartsContainer } from '../../components';

const Stats = () => {
  const { showStats, isLoading, monthlyApplications } = useAppContext();

  useEffect(() => {
    showStats();
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