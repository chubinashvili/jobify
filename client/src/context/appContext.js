import { createContext, useContext, useEffect, useReducer } from "react";
import reducer from "./reducer";
import axios from 'axios';
import { 
    CLEAR_ALERT, 
    DISPLAY_ALERT,
    SETUP_USER_BEGIN,
    SETUP_USER_SUCCESS,
    SETUP_USER_ERROR,
    LOGOUT_USER,
    TOGGLE_SIDEBAR,
    UPDATE_USER_BEGIN,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_ERROR,
    HANDLE_CHANGE,
    CLEAR_VALUES,
    CREATE_JOB_BEGIN,
    CREATE_JOB_SUCCESS,
    CREATE_JOB_ERROR,
    GET_JOBS_BEGIN,
    GET_JOBS_SUCCESS,
    SET_EDIT_JOB,
    DELETE_JOB_BEGIN,
    DELETE_JOB_ERROR,
    EDIT_JOB_BEGIN,
    EDIT_JOB_SUCCESS,
    EDIT_JOB_ERROR,
    SHOW_STATS_BEGIN,
    SHOW_STATS_SUCCESS,
    CLEAR_FILTERS,
    CHANGE_PAGE,
    GET_CURRENT_USER_BEGIN,
    GET_CURRENT_USER_SUCCESS,
} from "./actions";

const initialState = {
    userLoading: true,
    isLoading: false,
    showAlert: false,
    alertText: '',
    alertType: '',
    user: null,
    userLocation: '',   
    showSidebar: false,
    isEditing: false,
    editJobId: '',
    position: '',
    company: '',
    jobLocation: '',
    jobTypeOptions: ['full-time', 'part-time', 'remote', 'internship'],
    jobType: 'full-time',
    statusOptions: ['interview', 'declined', 'pending'],
    status: 'pending',
    jobs: [],
    totalJobs: 0,
    page: 1,
    numOfPages: 1,
    stats: {},
    monthlyApplications: [],
    search: '',
    searchStatus: 'all',
    searchType: 'all',
    sort: 'latest',
    sortOptions: ['latest', 'oldest', 'a-z', 'z-a'],
}

const AppContext = createContext();

const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    
    // axios
    const authFetch = axios.create({
        baseURL: '/api/v1'
    });

    // response
    
    authFetch.interceptors.response.use(
        (response) => {
            return response;
        },
         (err) => {
            if(err.response.status === 401) {
                logoutUser();
            }
            return Promise.reject(err);
        }
    );

    const displayAlert = () => {
        dispatch({ type: DISPLAY_ALERT });
        clearAlert();
    }

    const clearAlert = () => {
        setTimeout(() => {
            dispatch({
                type: CLEAR_ALERT,
            })
        }, 3000)
    }

    const setupUser = async ({ currentUser, endpoint, alertText }) => {
        dispatch({ type: SETUP_USER_BEGIN });
        try {
            const { data } = await axios.post(`/api/v1/auth/${endpoint}`, currentUser);    
            const { user, location } = data;
            dispatch({ type: SETUP_USER_SUCCESS, payload: { user, location, alertText }});
        } catch (err) {
            dispatch({ type: SETUP_USER_ERROR, payload: { msg: err.response.data.msg }})
        }
        clearAlert();
    }

    const logoutUser = async () => {
        await authFetch.get('/auth/logout');
        dispatch({ type: LOGOUT_USER });
      };

    const updateUser = async (currentUser) => {
        dispatch({ type: UPDATE_USER_BEGIN });
        try {
            const { data } = await authFetch.patch('/auth/updateUser', currentUser);

            const { user, location } = data;

            dispatch({ type: UPDATE_USER_SUCCESS, payload: { user, location }});
        } catch (err) {
            if(err.response.status !== 401) {
                dispatch({ type: UPDATE_USER_ERROR, payload: { msg: err.response.data.msg }});
            }
        }
        clearAlert();
    }
    
    const handleChange = ({ name, value }) => {
        dispatch({ type: HANDLE_CHANGE, payload: { name, value }});
    }
    
    const clearValues = () => {
        dispatch({ type: CLEAR_VALUES })
    }
    
    const createJob = async () => {
        dispatch({ type: CREATE_JOB_BEGIN });
        try {
            const { position, company, jobLocation, jobType, status } = state;
            await authFetch.post('/jobs', {
                company,
                position,
                jobLocation,
                jobType,
                status,
            });

            dispatch({ type: CREATE_JOB_SUCCESS });

            dispatch({ type: CLEAR_VALUES });
        } catch (err) {
            if(err.response.status === 401) return;
            dispatch({ type: CREATE_JOB_ERROR, payload: { msg: err.response.data.msg }});
        }
        clearAlert();
    }
    
    const getJobs = async () => {
        const { page, search, searchStatus, searchType, sort } = state;
        let url = `/jobs?page=${page}&status=${searchStatus}&jobType=${searchType}&sort=${sort}`;
        if (search) {
            url = url + `&search=${search}`;
        } 
        dispatch({ type: GET_JOBS_BEGIN });
        try {
            const { data } = await authFetch(url);
            const { jobs, totalJobs, numOfPages } = data;
            dispatch({ type: GET_JOBS_SUCCESS, payload: { jobs, totalJobs, numOfPages }});
        } catch (err) {
            logoutUser();
        }
        clearAlert();
    }

    const setEditJob = (id) => {
        dispatch({ type: SET_EDIT_JOB, payload: { id } });
    }

    const editJob = async () => {
        dispatch({ type: EDIT_JOB_BEGIN });
        try {
            const { position, company, jobLocation, jobType, status } = state;

            await authFetch.patch(`/jobs/${state.editJobId}`, {
                company,
                position,
                jobLocation,
                jobType,
                status,
            });

            dispatch({ type: EDIT_JOB_SUCCESS });

            dispatch({ type: CLEAR_VALUES });
        } catch (err) {
            if(err.response.status === 401) return;
            dispatch({ type: EDIT_JOB_ERROR, payload: { msg: err.response.data.msg }});
        }
        clearAlert();
    }

    const deleteJob = async (jobId) => {
        dispatch({ type: DELETE_JOB_BEGIN });
        try {
            await authFetch.delete(`/jobs/${jobId}`);
            getJobs();
        } catch (err) {
            if(err.response.status === 401) return;
            dispatch({ type: DELETE_JOB_ERROR, payload: { msg: err.response.data.msg }});
        }
        clearAlert();
    }

    const showStats = async () => {
        dispatch({ type: SHOW_STATS_BEGIN });
        try {
            const { data } = await authFetch('/jobs/stats');
            dispatch({ type: SHOW_STATS_SUCCESS, payload: { 
                stats: data.defaultStats,
                monthlyApplications: data.monthlyApplications,
            }})
        } catch (err) {
            logoutUser();
        }
        clearAlert();
    }

    const clearFilters = () => {
        dispatch({ type: CLEAR_FILTERS });
    }

    const changePage = (page) => {
        dispatch({ type: CHANGE_PAGE, payload:{ page }});
    }
    
    const toggleSidebar = () => {
        dispatch({ type: TOGGLE_SIDEBAR });
    }

    const getCurrentUser = async () => {
        dispatch({ type: GET_CURRENT_USER_BEGIN });
        try {
            const { data } = await authFetch('/auth/getCurrentUser');
            const { user, location } = data;
            dispatch({ type: GET_CURRENT_USER_SUCCESS, payload: { user, location }});
        } catch (err) {
            if(err.response.status === 401) return;
            logoutUser();
        }
    }

    useEffect(() => {
        getCurrentUser();
        // eslint-disable-next-line
    }, [])

    return (
        <AppContext.Provider value={{ 
            ...state, 
            displayAlert, 
            setupUser, 
            logoutUser, 
            updateUser,
            handleChange,
            clearValues,
            createJob,
            getJobs,
            setEditJob,
            editJob,
            deleteJob,
            showStats,
            clearFilters,
            changePage,
            toggleSidebar,
        }}>
            {children}
        </AppContext.Provider>
    )
}

const useAppContext = () => {
    return useContext(AppContext)
}

export { AppProvider, initialState, useAppContext };
