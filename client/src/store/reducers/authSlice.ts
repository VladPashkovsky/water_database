import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { apiAuth, AuthResponse } from '../../services/api.ts'

// export interface AuthResponse {
//   accessToken: string,
//   refreshToken: string,
//   user: IUser[]
// }
//
// export interface IUser {
//   id: string,
//   name: string,
//   email: string,
//   isActivated: boolean,
// }

// interface initialInterface {
//   user: IUser[],
//   isActivated: (IUser['isActivated']),
//   accessToken: (AuthResponse['accessToken']) | string,
//   refreshToken: (AuthResponse['refreshToken'])
// }

// interface initialInterface {
//   user: AuthResponse[],
//   isActivated: boolean,
//   accessToken: string,
//   refreshToken: string
// }

// const initialState: AuthResponse = {
//   id: '',
//   email: '',
//   isActivated: false,
//   accessToken: '',
//   refreshToken: ''
// }

interface AuthState {
  user: AuthResponse | null,
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
      .addMatcher(apiAuth.endpoints.login.matchFulfilled, (state, action: PayloadAction<AuthResponse>) => {
        state.user = action.payload
        state.isActivated = true
      })
      .addMatcher(apiAuth.endpoints.register.matchFulfilled, (state, action: PayloadAction<AuthResponse>) => {
        state.user = action.payload
        state.isActivated = true
      })
      .addMatcher(apiAuth.endpoints.current.matchFulfilled, (state, action) => {
        // state.user = action.payload
        // state.isAuth = true
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