import { makeFakeTodo } from '../../seed/todo'
import { makeFakeUser } from '../../seed/user'
import makeTodoDb from './todo.db'
import { makeDb } from '../../__tests__/db'
import { ITodoDb } from '../interfaces/i.todo'
import usersDb from '../../users/data-access'

let todoDb: ITodoDb
beforeEach(() => {
  todoDb = makeTodoDb({ makeDb, usersDb })
})
describe('Todo Database', () => {
  afterEach(() => {
    return todoDb.dropDb('todos')
  })
  it('inserts a todo into the db', async () => {
    const todo = makeFakeTodo()
    const user = makeFakeUser()
    const newUser = await usersDb.insert(user)
    const userId = newUser._id
    const inserted = await todoDb.insert({ userId, ...todo })
    const expected = {
      todo_name: todo.todo_name,
      start_time: todo.start_time,
      end_time: todo.end_time,
      description: todo.description,
      priority: todo.priority,
      id: inserted.id,
      userId,
    }
    expect(inserted).toEqual(expected)
  })

  it('updates a todo', async () => {
    const todo = makeFakeTodo()
    const user = makeFakeUser()
    const newUser = await usersDb.insert(user)
    const userId = newUser._id
    const inserted = await todoDb.insert({ userId, ...todo })
    const edited = await todoDb.update({ ...inserted, id: inserted.id, todo_name: 'Get Groceries' })
    expect(edited).not.toEqual(inserted)
    expect(edited?.todo_name).toBe('Get Groceries')
  })

  it('removes a todo', async () => {
    const todo = makeFakeTodo()
    const user = makeFakeUser()
    const newUser = await usersDb.insert(user)
    const userId = newUser._id
    const inserted = await todoDb.insert({ userId, ...todo })
    const deleted = await todoDb.remove({ id: inserted.id })
    expect(deleted).toBe(1)
    const foundTodo = await todoDb.findById({ id: inserted.id })
    expect(foundTodo).toBeNull()
  })

  it('finds by id', async () => {
    const todo = makeFakeTodo()
    const user = makeFakeUser()
    const newUser = await usersDb.insert(user)
    const userId = newUser._id
    const inserted = await todoDb.insert({ userId, ...todo })
    const foundTodo = await todoDb.findById({ id: inserted.id })
    const expected = {
      todo_name: todo.todo_name,
      start_time: todo.start_time,
      end_time: todo.end_time,
      description: todo.description,
      priority: todo.priority,
      _id: inserted.id,
      userId,
    }
    expect(foundTodo).toEqual(expected)
  })
})
