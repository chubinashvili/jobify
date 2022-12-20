import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
    isLoading: false,
    showAlert: false,
    alertText: '',
    alertType: '',
}

export const alertsSlice = createSlice({
  name: 'alerts',
  initialState,
  reducers: {
    setLoading(state) {
        state.isLoading = true
    },
    setupUserAlert(state, action) {
      state.isLoading = false
      state.showAlert = true
      state.alertType = 'success'
      state.alertText = `${action.payload.alertText} Redirecting...`
    },
    setErrorAlert(state, action) {
      state.isLoading = false
      state.showAlert = true
      state.alertType = 'danger'
      state.alertText = action.payload.msg
    },
    updateUserAlert(state) {
        state.isLoading = false
        state.showAlert = true
        state.alertType = 'success'
        state.alertText = 'User Profile Updated!'
    },
    setClearAlert(state) {
        state.isLoading = false
        state.showAlert = false
        state.alertType = ''
        state.alertText = ''
    },
    setUserLoadingAlert(state) {
        state.showAlert = false
    },
    setDisplayAlert(state) {
        state.showAlert = true
        state.alertType = 'danger'
        state.alertText = 'Please provide all values!'
    },
    showStatsAlert(state) {
      state.isLoading = false
    },
    createJobAlert(state) {
      state.isLoading = false
      state.showAlert = true
      state.alertType = 'success'
      state.alertText = 'New Job Created!'
    },
    jobsLoadingAlert(state) {
      state.isLoading = true
      state.showAlert = false
    },
    getJobsAlert(state) {
      state.isLoading = false
    },
    editJobAlert(state) {
      state.isLoading = false
      state.showAlert = true
      state.alertType = 'success'
      state.alertText = 'Job Updated!'
    },
  },
})

export const {
  setLoading,
  setupUserAlert,
  setErrorAlert,
  updateUserAlert,
  setClearAlert,
  setUserLoadingAlert,
  setDisplayAlert,
  showStatsAlert,
  createJobAlert,
  jobsLoadingAlert,
  getJobsAlert,
  editJobAlert,
} = alertsSlice.actions

export const clearAlert  = async (dispatch) => {
  setTimeout(() => {
    dispatch(setClearAlert());
  }, 3000)
}
export const displayAlert = async (dispatch) => {
    dispatch(setDisplayAlert());
    clearAlert(dispatch);
}


export default alertsSlice.reducer
