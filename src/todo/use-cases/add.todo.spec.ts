import { makeAddTodo } from './add.todo'
import { makeFakeUser } from '../../seed/user'
import { makeFakeTodo } from '../../seed/todo'
import { makeDb, stop, cleanup } from '../../__tests__/db'
import makeTodoDb from '../data-acess/todo.db'
import { ITodoDb } from '../interfaces/i.todo'
import usersDb from '../../users/data-access'

let todoDb: ITodoDb

beforeAll(() => {
  todoDb = makeTodoDb({ makeDb, usersDb })
})

afterAll(() => {
  return todoDb.dropDb('todos')
})

describe('Add Todo', () => {
  it('adds a todo into the database', async () => {
    const todo = makeFakeTodo({ priority: 'low' })
    const addTodo = makeAddTodo({ todoDb })
    const fakeUser = makeFakeUser()
    const user = await usersDb.insert(fakeUser)
    const userId = user._id
    const insertedTodo = await addTodo({ userId, ...todo })
    const expected = {
      todo_name: todo.todo_name,
      start_time: todo.start_time,
      end_time: todo.end_time,
      description: todo.description,
      priority: todo.priority,
      id: insertedTodo.id,
      userId
    }
    expect(insertedTodo).toHaveProperty('id')
    expect(insertedTodo).toEqual(expected)
    const foundUser = await usersDb.findById({ id: userId })
    expect(foundUser?.todos.length).toBe(1)
  })
})
