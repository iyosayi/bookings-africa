import { InvalidParameterError, UnauthorizedError } from '../../helpers/Errors'
import { IUserDb } from '../../users/user-interfaces/i.user'
import { ITodoDb } from '../interfaces/i.todo'

export const makeListTodo = ({ todoDb, usersDb }: { usersDb: IUserDb; todoDb: ITodoDb }) => {
  return async function listTodo({ userId, id }: { userId: string; id: string }) {
    const user = await usersDb.findById({ id: userId })
    if (!user) {
      throw new InvalidParameterError('User does not exist.')
    }

    if (id) {
      const usersTodos = user?.todos.some((item) => item.toString() === id)
      if (!usersTodos) {
        throw new UnauthorizedError('You cannot view another person todo.')
      }
      const found = await todoDb.findById({ id })
      if (!found) {
        throw new InvalidParameterError('Todo does not exist.')
      }
      return found
    }

    const foundTodos = await todoDb.findAll()
    const filteredTodos = foundTodos.filter((todo) => todo.userId === userId)
    if (filteredTodos.length === 0) {
      throw new InvalidParameterError('You do not have any todo list.')
    }

    return filteredTodos
  }
}
