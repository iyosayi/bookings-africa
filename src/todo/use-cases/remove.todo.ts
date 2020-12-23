import { InvalidParameterError, UnauthorizedError, RequiredParameterError } from '../../helpers/Errors'
import { ID, IUserDb } from '../../users/user-interfaces/i.user'
import { ITodoDb } from '../interfaces/i.todo'

export const makeRemoveTodo = ({ todoDb, usersDb }: { usersDb: IUserDb; todoDb: ITodoDb }) => {
  return async function removeTodo({ userId, id }: { userId: string; id: string }) {
    const user = await usersDb.findById({ id: userId })
    if (!user) {
      throw new InvalidParameterError('User does not exist.')
    }
    if (!id) {
      throw new RequiredParameterError('Id')
    }
    const todoToDelete = await todoDb.findById({ id })
    const usersTodos = user?.todos.some((item) => item.toString() === id)
    if (!usersTodos) {
      throw new UnauthorizedError('You cannot delete another persons todo.')
    }
    if (!todoToDelete) {
      throw new InvalidParameterError('Todo does not exist')
    }
    const todoId = todoToDelete?.id

    const hardDelete = async () => {
      await todoDb.remove({ id: todoId })
      return {
        deletedCount: 1,
        message: 'Todo deleted.',
      }
    }
    return hardDelete()
  }
}
