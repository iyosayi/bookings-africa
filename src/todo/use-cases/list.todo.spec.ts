import { makeListTodo } from './list.todo'
import { makeFakeTodo } from '../../seed/todo'
import { makeFakeUser } from '../../seed/user'
import { makeDb } from '../../__tests__/db'
import makeTodoDb from '../data-acess/todo.db'
import { ITodoDb } from '../interfaces/i.todo'
import usersDb from '../../users/data-access'

let todoDb: ITodoDb

beforeAll(() => {
  todoDb = makeTodoDb({ makeDb, usersDb })
})

describe('List todo', () => {
  afterAll(() => {
    return todoDb.dropDb('todos')
  })
  it('can have an id', async () => {
    const todo = makeFakeTodo()
    const listTodos = makeListTodo({ todoDb, usersDb })
    const user = makeFakeUser()
    const newUser = await usersDb.insert(user)
    const userId = newUser._id
    const newTodo = await todoDb.insert({ userId, ...todo })
    expect(newTodo).toBeDefined()
    const foundTodo = await listTodos({ userId, id: newTodo.id.toString() })
    expect(foundTodo).toBeDefined()
  })
})
