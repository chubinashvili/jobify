import { createSlice } from '@reduxjs/toolkit';
import { logoutUser } from '../user/userSlice';
import { setLoading, clearAlert, showStatsAlert } from '../alerts/alertsSlice';
import authFetch from '../../axios';

export const initialState = {
    stats: {},
    monthlyApplications: [],
    page: 1,
}

export const statsSlice = createSlice({
  name: 'stats',
  initialState,
  reducers: {
    setShowStats(state, action) {
        state.stats = action.payload.stats
        state.monthlyApplications = action.payload.monthlyApplications
    },
    setChangePage(state, action) {
        state.page = action.payload.page
    },
  },
})

export const {
  setShowStats,
  setChangePage,
} = statsSlice.actions

export const showStats = async (dispatch) => {
    dispatch(setLoading());
    try {
        const { data } = await authFetch('/jobs/stats');
        dispatch(setShowStats({ 
            stats: data.defaultStats,
            monthlyApplications: data.monthlyApplications,
        }))
        dispatch(showStatsAlert());
    } catch (err) {
        logoutUser(dispatch);
    }
    clearAlert(dispatch);
}

export const changePage = async (dispatch, page) => {
    dispatch(setChangePage(page));

}

export default statsSlice.reducer
