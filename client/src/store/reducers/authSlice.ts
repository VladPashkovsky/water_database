import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { apiAuth, AuthResponse } from '../../services/api.ts'
import {User} from '../../models/types.ts'

interface AuthState {
  user: User & { accessToken: string, refreshToken: string } | null,
  isActivated: boolean
}

const initialState: AuthState = {
  user: null,
  isActivated: false,
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
        state.isActivated = true
      })
      .addMatcher(apiAuth.endpoints.register.matchFulfilled, (state, action) => {
        state.user = action.payload
        state.isActivated = true
      })
      .addMatcher(apiAuth.endpoints.current.matchFulfilled, (state, action) => {
        state.user = action.payload
        state.isActivated = true
      })
  },
})

export const { logout } = authSlice.actions
export default authSlice.reducer

// interface AuthState {
//   user: User & { token: string } | null,
//   isAuth: boolean
// }

// const initialState: AuthState = {
//   user: null,
//   isAuth: false,
// }

// export const authSlice = createSlice({
//   name: 'auth',
//   initialState,
//   reducers: {
//     logout: () => initialState,
//   },
//   extraReducers: (builder) => {
//     builder
//       .addMatcher(apiAuth.endpoints.login.matchFulfilled, (state, action) => {
//         state.user = action.payload
//         state.isAuth = true
//       })
//       .addMatcher(apiAuth.endpoints.register.matchFulfilled, (state, action) => {
//         state.user = action.payload
//         state.isAuth = true
//       })
//       .addMatcher(apiAuth.endpoints.current.matchFulfilled, (state, action) => {
//         state.user = action.payload
//         state.isAuth = true
//       })
//   },
// })
//
// export const { logout } = authSlice.actions
// export default authSlice.reducer