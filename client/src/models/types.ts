export interface User {
  id: string,
  email: string,
  password: string,
  name: string,
  createdProduct: Water[],
  Token: Token[]
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

export type ErrorWithMessage = {
  status: number,
  data: {
    message: string
  }
}