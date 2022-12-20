import { combineReducers } from '@reduxjs/toolkit';

import userReducer from './user/userSlice';
import jobsReducer from './jobs/jobsSlice';
import statsReducer from './stats/statsSlice';
import alertsReducer from './alerts/alertsSlice';

export const rootReducer = combineReducers({
  user: userReducer,
  jobs: jobsReducer,
  stats: statsReducer,
  alerts: alertsReducer
});