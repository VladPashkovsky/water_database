import { createListenerMiddleware } from '@reduxjs/toolkit'
import { apiAuth } from '../../services/api.ts'

export const authMiddleware = createListenerMiddleware()
authMiddleware.startListening({
  matcher: apiAuth.endpoints.login.matchFulfilled,
  effect: async (action, api) => {
    api.cancelActiveListeners()
    action.payload.accessToken && localStorage.setItem('token', action.payload.accessToken)
  },
})