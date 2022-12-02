import { DISPLAY_ALERT } from "./actions"

const reducer = (state, { type, payload }) => {
    switch (type) {
        case DISPLAY_ALERT:
            return { ...state, showAlert: true, alertType: 'danger', alertText: 'Please provide all values!'};
    }
    // throw new Error(`no such action: ${type}`);
}

export default reducer