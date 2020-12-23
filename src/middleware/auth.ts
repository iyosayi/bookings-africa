import jwt from 'jsonwebtoken'
import { UnauthorizedError } from '../helpers/Errors'
import { wrapAsync } from '../helpers/wrap.async'

const JWT_SECRET = process.env.JWT_SECRET
export const decodeToken = (controller: Function) => {
  return wrapAsync(async (httpRequest: any) => {
    const token = httpRequest.headers['x-auth-token']
    if (!token) {
      throw new UnauthorizedError('No token, authorization denied.')
    }

    // @ts-ignore
    const decoded = jwt.verify(token, JWT_SECRET)
    httpRequest.user = decoded
    return controller(httpRequest)
  })
}
