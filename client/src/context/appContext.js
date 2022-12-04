import { createContext, useContext, useReducer } from "react";
import reducer from "./reducer";
import axios from 'axios';
import { 
    CLEAR_ALERT, 
    DISPLAY_ALERT,
    REGISTER_USER_BEGIN,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_ERROR,
} from "./actions";

const initialState = {
    isLoading: false,
    showAlert: false,
    alertText: '',
    alertType: '',
    user: null,
    token: null,
    userLocation: '',
    jobLocation: '',
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

    const registerUser = async (currentUser) => {
        dispatch({ type: REGISTER_USER_BEGIN });
        try {
            const { data } = await axios.post('/api/v1/auth/register', currentUser);    
            const { user, token, location } = data;
            dispatch({ type: REGISTER_USER_SUCCESS, payload: { user, token, location }});
            // local storage later
        } catch (err) {
            dispatch({ type: REGISTER_USER_ERROR, payload: { msg: err.response.data.msg }})
        }
        clearAlert();
    }

    return (
        <AppContext.Provider value={{ ...state, displayAlert, registerUser }}>
            {children}
        </AppContext.Provider>
    )
}

const useAppContext = () => {
    return useContext(AppContext)
}

export { AppProvider, initialState, useAppContext };
