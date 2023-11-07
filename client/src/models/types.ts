export interface User {
  id?: string,
  email?: string,
  password?: string,
  name?: string,
  createdProduct?: Water[],
  Token?: Token[]
}

export interface Water {
  id: string,
  brand: string,
  description: string,
  details: string,
  price: string,
  imageUrl: string,
  user: User,
  userId: string
}

export interface Token {
  userId: string,
  refreshToken: string,
  user: User
}

// export interface AuthResponse {
//   id: string,
//   email: string,
//   password?: string,
//   name?: string,
//   isActivated: boolean,
//   accessToken: string,
//   refreshToken: string,
// }
//
// export interface IUser {
//   id: string,
//   name: string,
//   email: string,
//   isActivated: boolean,
// }

export type ErrorWithMessage = {
  status: number,
  data: {
    message: string
  }
}