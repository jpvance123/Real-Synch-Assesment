import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice'
import teamReducer from '../features/teams/teamSlice'
import weatherReducer from '../features/weather/weatherSlice'


export const store = configureStore({
  reducer: {
    auth: authReducer,
    teams: teamReducer,
    weather: weatherReducer,
  },
});
