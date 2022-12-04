import { 
    CLEAR_ALERT, 
    DISPLAY_ALERT,
    REGISTER_USER_BEGIN,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_ERROR,
} from "./actions";

const reducer = (state, { type, payload }) => {
    switch (type) {
        case DISPLAY_ALERT:
            return { ...state, showAlert: true, alertType: 'danger', alertText: 'Please provide all values!'};
        case CLEAR_ALERT:
            return { ...state, showAlert: false, alertType: '', alertText: ''};
        case REGISTER_USER_BEGIN:
            return { ...state, isLoading: true };
        case REGISTER_USER_SUCCESS:
            return { 
                ...state, 
                isLoading: false, 
                token: payload.token, 
                user: payload.user, 
                userLocation: payload.location, 
                jobLocation: payload.location,
                showAlert: true,
                alertType: 'success',
                alertText: 'User Created! Redirecting...',
            };
        case REGISTER_USER_ERROR:
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
    // throw new Error(`no such action: ${type}`);
}

export default reducer