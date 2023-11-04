import { User } from '@prisma/client'
import { createSlice } from '@reduxjs/toolkit'
import { apiAuth } from '../../services/api.ts'

interface AuthState {
  user: User & { token: string } | null,
  isAuth: boolean
}

const initialState: AuthState = {
  user: null,
  isAuth: false,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(apiAuth.endpoints.login.matchFulfilled, (state, action) => {
        state.user = action.payload
        state.isAuth = true
      })
      .addMatcher(apiAuth.endpoints.register.matchFulfilled, (state, action) => {
        state.user = action.payload
        state.isAuth = true
      })
      .addMatcher(apiAuth.endpoints.current.matchFulfilled, (state, action) => {
        state.user = action.payload
        state.isAuth = true
      })
  },
})

export const { logout } = authSlice.actions
export default authSlice.reducer