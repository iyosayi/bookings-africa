import makeExpressCallback from '../../express'
import { postLogin } from '../controllers'

export const path = '/api/v1/auth'
export function config(router: any) {
  router.post('/', makeExpressCallback(postLogin))
  return router
}
