import { createApi, fetchBaseQuery} from '@reduxjs/toolkit/dist/query/react'
import { RootState } from '../store/store.ts'
import { User, Water } from '@prisma/client'

export type UserDataLogin = Omit<User, 'id' | 'name'>
export type UserData = Omit<User, 'id'>
type ResponseLoginData = User & { token: string }

const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:8000/api',
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).authReducer.user?.token ||
      localStorage.getItem('token')
    token && headers.set('authorization', `Bearer ${token}`)
    return headers
  },
})

// const baseQueryWithRetry = retry(baseQuery, {maxRetries: 1})

export const apiAuth = createApi({
  reducerPath: 'apiAuth',
  baseQuery: baseQuery,
  tagTypes: ['Auth'],
  refetchOnMountOrArgChange: true,
  endpoints: (build) => ({
    login: build.mutation<ResponseLoginData, UserDataLogin>({
      query: (userDataLogin) => ({ url: '/user/login', method: 'POST', body: userDataLogin }),
      invalidatesTags: ['Auth'],
    }),
    register: build.mutation<ResponseLoginData, UserData>({
      query: (userData) => ({ url: '/user/register', method: 'POST', body: userData }),
      invalidatesTags: ['Auth'],
    }),
    current: build.query<ResponseLoginData, void>({
      query: () => ({ url: '/user/current' }),
      providesTags: result => ['Auth'],
    }),
  }),
})

export const { useLoginMutation, useRegisterMutation, useCurrentQuery } = apiAuth
export const { endpoints: { login, register, current } } = apiAuth

//==============================================================================

export const apiWater = createApi({
  reducerPath: 'apiWater',
  baseQuery: baseQuery,
  tagTypes: ['Water'],
  refetchOnMountOrArgChange: true,
  endpoints: (build) => ({
    getAllWaters: build.query<Water[], void>({
      query: () => ({ url: '/water' }),
      providesTags: result => ['Water'],
    }),
    getWaterById: build.query<Water, string>({
      query: (id) => ({ url: `/water/${id}` }),
      providesTags: result => ['Water'],
    }),
    addWater: build.mutation<Water, Water>({
      query: (water) => ({ url: `/water/add`, method: 'POST', body: water }),
      invalidatesTags: ['Water'],
    }),
    editWater: build.mutation<string, Water>({
      query: (water) => ({ url: `/water/edit/${water.id}`, method: 'PUT', body: water }),
      invalidatesTags: ['Water'],
    }),
    removeWater: build.mutation<string, string>({
      query: (id) => ({ url: `/water/remove/${id}`, method: 'DELETE' }),
      invalidatesTags: ['Water'],
    }),
  }),
})

export const {
  useGetAllWatersQuery,
  useGetWaterByIdQuery,
  useAddWaterMutation,
  useEditWaterMutation,
  useRemoveWaterMutation,
} = apiWater

export const {
  endpoints: {
    getAllWaters,
    getWaterById,
    addWater,
    editWater,
    removeWater,
  },
} = apiWater