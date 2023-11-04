import {Water} from '../../models/types.ts'
import { createSlice } from '@reduxjs/toolkit'
import { apiWater } from '../../services/api.ts'

interface WaterState {
  waters: Water[] | null
}

const initialState: WaterState = {
  waters: null,
}

export const waterSlice = createSlice({
  name: 'water',
  initialState,
  reducers: {
    logout: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(apiWater.endpoints.getAllWaters.matchFulfilled, (state, action) => {
        state.waters = action.payload
      })
  },
})

export default waterSlice.reducer