import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import authFetch from '../../axios';
import { setLoading, clearAlert, setErrorAlert, setupUserAlert, updateUserAlert, setUserLoadingAlert } from '../alerts/alertsSlice';

export const initialState = {
    userLoading: false,
    user: null,
    userLocation: '', 
    jobLocation: '',  
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      state.userLoading = false
      state.user = action.payload.user
      state.userLocation = action.payload.location
      state.jobLocation = action.payload.location
    },
    logout(state) {
      return { ...initialState, userLoading: false }
    },
    setUpdateUser(state, action) {
        state.user = action.payload.user
        state.userLocation = action.payload.userLocation
        state.jobLocation = action.payload.jobLocation
    },
    setUserLoading(state) {
        state.userLoading = true
    },
    setCurrentUser(state, action) {
        state.userLoading = false
        state.user = action.payload.user
        state.userLocation = action.payload.location
        state.jobLocation = action.payload.location
    },
  },
})

export const {
  setUser,
  logout,
  setUpdateUser,
  setUserLoading,
  setCurrentUser,
} = userSlice.actions

export const setupUser = async (dispatch, { currentUser, endpoint, alertText }) => {
    dispatch(setLoading());
    try {
        const { data } = await axios.post(`/api/v1/auth/${endpoint}`, currentUser);    
        const { user, location } = data;
        dispatch(setUser({ user, location, alertText }));
        dispatch(setupUserAlert({alertText}));
    } catch (err) {
        dispatch(setErrorAlert({ msg: err.response.data.msg }))
    }
    clearAlert(dispatch);
}

export const logoutUser = async (dispatch) => {
    await authFetch.get('/auth/logout');
    dispatch(logout());
};

export const updateUser = async (dispatch, currentUser) => {
    dispatch(setLoading());
    try {
        const { data } = await authFetch.patch('/auth/updateUser', currentUser);

        const { user, location } = data;

        dispatch(setUpdateUser({ user, location }));
        dispatch(updateUserAlert());
    } catch (err) {
        if(err.response.status !== 401) {
            dispatch(setErrorAlert({ msg: err.response.data.msg }))
        }
    }
    clearAlert(dispatch);
}

export const getCurrentUser = async (dispatch) => {
    dispatch(setUserLoading());
    try {
        const { data } = await authFetch('/auth/getCurrentUser');
        const { user, location } = data;
        dispatch(setCurrentUser({ user, location }));
        dispatch(setUserLoadingAlert());
    } catch (err) {
        if(err.response.status === 401) return;
        logoutUser(dispatch);
    }
}

export default userSlice.reducer