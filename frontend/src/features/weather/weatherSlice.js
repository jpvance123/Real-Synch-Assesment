import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import weatherService from './weatherService'

const initialState = {
  weather: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: ''
}

export const getWeather = createAsyncThunk('weather/getWeather', async (teamID, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token
    return await weatherService.getWeather(teamID, token)
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})


export const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false
      state.isError = false
      state.isSuccess = false
      state.message = ''
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getWeather.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getWeather.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.weather = action.payload
      })
      .addCase(getWeather.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset } = weatherSlice.actions
export default weatherSlice.reducer