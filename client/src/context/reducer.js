import { 
    CLEAR_ALERT, 
    DISPLAY_ALERT,
    SETUP_USER_BEGIN,
    SETUP_USER_SUCCESS,
    SETUP_USER_ERROR,
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
        default: 
            return state;
    }
}

export default reducer