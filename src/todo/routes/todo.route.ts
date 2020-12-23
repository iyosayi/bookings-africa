import makeExpressCallback from '../../express'
import { postTodo, patchTodo, deleteTodo, getTodo, getSearch } from '../controllers'
import { decodeToken } from '../../middleware/auth'

export const path = '/api/v1/todos'
export function config(router: any) {
  router
    .get('/search', makeExpressCallback(decodeToken(getSearch)))
    .get('/', makeExpressCallback(decodeToken(getTodo)))
    .get('/:id', makeExpressCallback(decodeToken(getTodo)))
    .post('/', makeExpressCallback(decodeToken(postTodo)))
    .patch('/:id', makeExpressCallback(decodeToken(patchTodo)))
    .delete('/:id', makeExpressCallback(decodeToken(deleteTodo)))
  return router
}
