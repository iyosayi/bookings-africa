import makeTodo from '../entities'
import { ID, ITodo, ITodoDb } from '../interfaces/i.todo'
import { RequiredParameterError, UnauthorizedError } from '../../helpers/Errors'
import { IUserDb } from '../../users/user-interfaces/i.user'

export const makeEditTodo = ({ todoDb, usersDb }: { usersDb: IUserDb; todoDb: ITodoDb }) => {
  return async function editUser({ userId, id, ...changes }: { userId: string; id: string } & ITodo) {
    const user = await usersDb.findById({ id: userId })
    if (!id) {
      throw new RequiredParameterError('Id')
    }
    const userTodos = user?.todos.some((item) => item.toString() === id)
    if (!userTodos) {
      throw new UnauthorizedError('You cannot edit another persons todo.')
    }

    const exists = await todoDb.findById({ id })
    const todo = makeTodo({ ...exists, ...changes })
    const updated = await todoDb.update({
      todo_name: todo.getTodoName(),
      start_time: todo.getStartTime(),
      description: todo.getDescription(),
      priority: todo.getPriority(),
      end_time: todo.getEndTime(),
      id,
    })
    return updated
  }
}
