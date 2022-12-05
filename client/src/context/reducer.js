import { initialState } from './appContext.js';
import { 
    CLEAR_ALERT, 
    DISPLAY_ALERT,
    SETUP_USER_BEGIN,
    SETUP_USER_SUCCESS,
    SETUP_USER_ERROR,
    TOGGLE_SIDEBAR,
    LOGOUT_USER,
} from "./actions";

const reducer = (state, { type, payload }) => {
    switch (type) {
        case DISPLAY_ALERT:
            return { ...state, showAlert: true, alertType: 'danger', alertText: 'Please provide all values!'};
        case CLEAR_ALERT:
            return { ...state, showAlert: false, alertType: '', alertText: ''};
        case SETUP_USER_BEGIN:
            return { ...state, isLoading: true };
        case SETUP_USER_SUCCESS:
            return { 
                ...state, 
                isLoading: false, 
                token: payload.token, 
                user: payload.user, 
                userLocation: payload.location, 
                jobLocation: payload.location,
                showAlert: true,
                alertType: 'success',
                alertText: `${payload.alertText} Redirecting...`,
            };
        case SETUP_USER_ERROR:
            return { 
                ...state, 
                isLoading: false, 
                showAlert: true,
                alertType: 'danger',
                alertText: payload.msg,
            };
        case LOGOUT_USER:
            return { 
                ...initialState, 
                user: null, 
                token: null,
                userLocation: '',
                jobLocation: '',
            };
        case TOGGLE_SIDEBAR:
            return { ...state, showSidebar: !state.showSidebar}
        default: 
            return state;
    }
}

export default reducer