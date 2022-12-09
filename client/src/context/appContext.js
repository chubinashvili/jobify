import { createContext, useContext, useReducer } from "react";
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
    EDIT_JOB_BEGIN,
    EDIT_JOB_SUCCESS,
    EDIT_JOB_ERROR,
    SHOW_STATS_BEGIN,
    SHOW_STATS_SUCCESS,
    CLEAR_FILTERS,
} from "./actions";

const token = localStorage.getItem('token');
const user = localStorage.getItem('user');
const userLocation = localStorage.getItem('location');

const initialState = {
    isLoading: false,
    showAlert: false,
    alertText: '',
    alertType: '',
    user: user ? JSON.parse(user) : null,
    token: token ? JSON.parse(token) : null,
    userLocation: JSON.parse(userLocation) || '',   
    showSidebar: false,
    isEditing: false,
    editJobId: '',
    position: '',
    company: '',
    jobLocation: JSON.parse(userLocation) || '',
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

    // request
    
    authFetch.interceptors.request.use(
        (config) => {
            config.headers['Authorization'] = `Bearer ${state.token}`;
            return config;
        },
         (err) => {
            return Promise.reject(err);
        }
    );

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

    const addUserToLocalStorage = ({ user, token, location }) => {
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('token', JSON.stringify(token));
        localStorage.setItem('location', JSON.stringify(location));
    }

    const removeUserFromLocalStorage = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        localStorage.removeItem('location');
    }

    const setupUser = async ({ currentUser, endpoint, alertText }) => {
        dispatch({ type: SETUP_USER_BEGIN });
        try {
            const { data } = await axios.post(`/api/v1/auth/${endpoint}`, currentUser);    
            const { user, token, location } = data;
            dispatch({ type: SETUP_USER_SUCCESS, payload: { user, token, location, alertText }});
            addUserToLocalStorage({ user, token, location });
        } catch (err) {
            dispatch({ type: SETUP_USER_ERROR, payload: { msg: err.response.data.msg }})
        }
        clearAlert();
    }

    const logoutUser = () => {
        dispatch({ type: LOGOUT_USER });
        removeUserFromLocalStorage();
    }

    const updateUser = async (currentUser) => {
        dispatch({ type: UPDATE_USER_BEGIN });
        try {
            const { data } = await authFetch.patch('/auth/updateUser', currentUser);

            const { user, location, token } = data;

            dispatch({ type: UPDATE_USER_SUCCESS, payload: { user, location, token }});
            addUserToLocalStorage({ user, location, token });
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
        const { search, searchStatus, searchType, sort } = state;
        let url = `/jobs?&status=${searchStatus}&jobType=${searchType}&sort=${sort}`;
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
            logoutUser(); 
        }
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
    
    const toggleSidebar = () => {
        dispatch({ type: TOGGLE_SIDEBAR });
    }

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
