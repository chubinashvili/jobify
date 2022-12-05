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
    userLocation: userLocation || '',   
    jobLocation: userLocation || '',
    showSidebar: false,
}

const AppContext = createContext();

const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

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

    const toggleSidebar = () => {
        dispatch({ type: TOGGLE_SIDEBAR });
    }

    return (
        <AppContext.Provider value={{ ...state, displayAlert, setupUser, logoutUser, toggleSidebar }}>
            {children}
        </AppContext.Provider>
    )
}

const useAppContext = () => {
    return useContext(AppContext)
}

export { AppProvider, initialState, useAppContext };
