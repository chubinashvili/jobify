import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getJobs } from '../../store/jobs/jobsSlice';
import Job from '../job/Job';
import Wrapper from '../../assets/wrappers/JobsContainer';
import PageBtnContainer from '../page-btn-container/PageBtnContainer';
import { Alert, Loading } from '..';

const JobsContainer = () => {
    const dispatch = useDispatch();
    const { 
        jobs, 
        page,
        totalJobs,
        numOfPages, 
        search,
        searchStatus,
        searchType,
        sort,
    } = useSelector(
        state => state.jobs,
    );

    const { isLoading, showAlert } = useSelector(state => state.alerts)

    useEffect(() => {
        getJobs(dispatch, {page, search, searchStatus, searchType, sort});
        // eslint-disable-next-line
    }, [page, search, searchStatus, searchType, sort]);

    if (isLoading) {
        return <Loading center />
    }

    if (jobs.length === 0) {
        return <Wrapper>
            <h2>No jobs to display...</h2>
        </Wrapper>
    }

    return (
        <Wrapper>
            {showAlert && <Alert />}
            <h5>{totalJobs} job{jobs.length > 1 && 's'} found</h5>
            <div className='jobs'>
                {jobs.map(job => {
                    return <Job 
                        key={job._id} 
                        {...job} 
                        page={page}
                        search={search}
                        searchStatus={searchStatus}
                        searchType={searchType}
                        sort={sort}
                    />
                })}
            </div>
            {numOfPages > 1 && <PageBtnContainer />}
        </Wrapper>
    ) 
}
export default JobsContainer