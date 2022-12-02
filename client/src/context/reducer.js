import { CLEAR_ALERT, DISPLAY_ALERT } from "./actions"

const reducer = (state, { type, payload }) => {
    switch (type) {
        case DISPLAY_ALERT:
            return { ...state, showAlert: true, alertType: 'danger', alertText: 'Please provide all values!'};
        case CLEAR_ALERT:
            return { ...state, showAlert: false, alertType: '', alertText: ''};
    }
    // throw new Error(`no such action: ${type}`);
}

export default reducer