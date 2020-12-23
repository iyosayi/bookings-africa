import { InvalidParameterError } from '../../helpers/Errors'
import { IUserDb } from '../../users/user-interfaces/i.user'
import { ITodoDb, ITodoResult } from '../interfaces/i.todo'

export const makeSearchTodo = ({ todoDb, usersDb }: { usersDb: IUserDb; todoDb: ITodoDb }) => {
  return async function listTodo({
    userId,
    priority,
    todo_name,
  }: {
    userId: string
    priority: string
    todo_name: string
  }) {
    const user = await usersDb.findById({ id: userId })
    if (!user) {
      throw new InvalidParameterError('No user with the id exists.')
    }
    let userTodo
    if (priority) {
      userTodo = await todoDb.search({ param: priority })
    }
    if (todo_name) {
      userTodo = await todoDb.search({ param: todo_name })
    }
    const filteredTodos = userTodo?.filter((todo: ITodoResult) => todo.userId === userId)
    if (filteredTodos?.length === 0) {
      throw new InvalidParameterError("You cannot search for another person's todo list.")
    }
    return filteredTodos
  }
}
