import { createSlice } from '@reduxjs/toolkit';
import { logoutUser } from '../user/userSlice';
import authFetch from '../../axios';
import { 
    setLoading, 
    clearAlert,
    createJobAlert,
    setErrorAlert,
    jobsLoadingAlert,
    getJobsAlert,
    editJobAlert,
} from '../alerts/alertsSlice';

export const initialState = {
    userLocation: '', 
    jobLocation: '',  
    isEditing: false,
    editJobId: '',
    position: '',
    company: '',
    status: 'pending',
    jobs: [],
    totalJobs: 0,
    numOfPages: 1,
    jobTypeOptions: ['full-time', 'part-time', 'remote', 'internship'],
    jobType: 'full-time',
    statusOptions: ['interview', 'declined', 'pending'],
    page: 1,
    search: '',
    searchStatus: 'all',
    searchType: 'all',
    sort: 'latest',
    sortOptions: ['latest', 'oldest', 'a-z', 'z-a'],
    showSidebar: false,
}

export const jobsSlice = createSlice({
  name: 'jobs',
  initialState,
  reducers: {
    setGetJobs(state, action) {
        state.jobs = action.payload.jobs
        state.totalJobs = action.payload.totalJobs
        state.numOfPages = action.payload.numOfPages
    },
    setEditJobPage(state, action) {
        const job = state.jobs.find((job) => job._id === action.payload.id);
        const { _id, position, jobLocation, company, jobType, status } = job;
        state.isEditing = true
        state.editJobId = _id
        state.position = position
        state.company = company
        state.jobLocation = jobLocation
        state.jobType = jobType
        state.status = status
    },
    clearValues(state) {
        state.isEditing = false
        state.editJobId = ''
        state.position = ''
        state.company = ''
        state.jobLocation = state.userLocation
        state.jobType = 'full-time'
        state.status = 'pending'
    },
    setHandleChange(state, action) {
        return { 
            ...state,
            page: 1,
            [action.payload.name]: action.payload.value,
        }
    },
    setClearFilters(state) {
        state.search = ''
        state.searchStatus = 'all'
        state.searchType = 'all'
        state.sort = 'latest'
    },
    setToggleSidebar(state) {
        state.showSidebar = !state.showSidebar
    },
  },
})

export const {
  setCreateJob,
  setGetJobs,
  setEditJobPage,
  editJobSet,
  setHandleChange,
  setClearFilters,
  setToggleSidebar,
  clearValues,
} = jobsSlice.actions


export const createJob = async (dispatch, job) => {
    dispatch(setLoading());
    try {
        const { company, position, jobLocation, jobType, status } = job;
        await authFetch.post('/jobs', {
            company,
            position,
            jobLocation,
            jobType,
            status,
        });

        dispatch(createJobAlert());

        dispatch(clearValues())
    } catch (err) {
        if(err.response.status === 401) return;
        dispatch(setErrorAlert({ msg: err.response.data.msg }));
    }
    clearAlert(dispatch);
}

export const getJobs = async (dispatch, { page, search, searchStatus, searchType, sort }) => {
    let url = `/jobs?page=${page}&status=${searchStatus}&jobType=${searchType}&sort=${sort}`;
    if (search) {
        url = url + `&search=${search}`;
    } 
    dispatch(jobsLoadingAlert());
    try {
        const { data } = await authFetch(url);
        const { jobs, totalJobs, numOfPages } = data;
        dispatch(setGetJobs({ jobs, totalJobs, numOfPages }));
        dispatch(getJobsAlert());
    } catch (err) {
        logoutUser(dispatch);
    }
    clearAlert(dispatch);
}
export const setEditJob = async (dispatch, id) => {
    dispatch(setEditJobPage({ id }));
}

export const editJob = async (dispatch, job) => {
    dispatch(setLoading());
    try {
        const { position, company, jobLocation, jobType, status } = job;

        await authFetch.patch(`/jobs/${job.editJobId}`, {
            company,
            position,
            jobLocation,
            jobType,
            status,
        });

        dispatch(editJobAlert());

        dispatch(clearValues())
    } catch (err) {
        if(err.response.status === 401) return;
        dispatch(setErrorAlert({ msg: err.response.data.msg }));
    }
    clearAlert(dispatch);
}

export const deleteJob = async (dispatch, jobId, {page, search, searchStatus, searchType, sort}) => {
    dispatch(setLoading());
    try {
        await authFetch.delete(`/jobs/${jobId}`);
        getJobs(dispatch, {page, search, searchStatus, searchType, sort});
    } catch (err) {
        if(err.response.status === 401) return;
        dispatch(setErrorAlert({ msg: err.response.data.msg }));
    }
    clearAlert(dispatch);
}

export const handleChange = async (dispatch, { name, value }) => {
    dispatch(setHandleChange({ name, value }));
}

export const clearFilters = (dispatch) => {
    dispatch(setClearFilters());
}

export const toggleSidebar = (dispatch) => {
    dispatch(setToggleSidebar());
}

export default jobsSlice.reducer
