import makeTodo from '../entities'
import { ITodoDb, ITodo } from '../interfaces/i.todo'

export const makeAddTodo = ({ todoDb }: { todoDb: ITodoDb }) => {
  return async function addTodo({ userId, ...todoDetails }: { userId: string } & ITodo) {
    const todo = makeTodo({ ...todoDetails })
    return todoDb.insert({
      todo_name: todo.getTodoName(),
      start_time: todo.getStartTime(),
      end_time: todo.getEndTime(),
      priority: todo.getPriority(),
      description: todo.getDescription(),
      userId
    })
  }
}
 