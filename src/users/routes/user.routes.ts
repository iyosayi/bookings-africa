import makeExpressCallback from '../../express'
import { postUser } from '../controllers'

export const path = '/api/v1/users'
export function config(router: any) {
  router.post('/', makeExpressCallback(postUser))
  return router
}
