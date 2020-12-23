import { makeRemoveTodo } from './remove.todo'
import { makeFakeTodo } from '../../seed/todo'
import { makeFakeUser } from '../../seed/user'
import { makeDb } from '../../__tests__/db'
import makeTodoDb from '../data-acess/todo.db'
import { ITodoDb } from '../interfaces/i.todo'
import usersDb from '../../users/data-access'
import { ObjectId } from 'mongodb'

let todoDb: ITodoDb

beforeAll(() => {
  todoDb = makeTodoDb({ makeDb, usersDb })
})

describe('Remove todo', () => {
  afterAll(() => {
    return todoDb.dropDb('todos')
  })

  it('handles non-existent todos', async () => {
    const todo = makeFakeTodo()
    const removeTodo = makeRemoveTodo({ todoDb, usersDb })
    const user = makeFakeUser()
    const newUser = await usersDb.insert(user)
    const userId = newUser._id
    const newTodo = await todoDb.insert({ userId, ...todo })
    const actual = { userId, id: new ObjectId().toString() }
    expect(removeTodo(actual)).rejects.toThrow('You cannot delete another persons todo.')
  })

  it('throws when no user is found', async () => {
    const todo = makeFakeTodo()
    const removeTodo = makeRemoveTodo({ todoDb, usersDb })
    const user = makeFakeUser()
    const newUser = await usersDb.insert(user)
    const userId = '5fe26b67bee9d168a0b8e88b'
    await todoDb.insert({ userId, ...todo })
    const actual = { userId, id: new ObjectId().toString() }
    expect(removeTodo(actual)).rejects.toThrow('User does not exist.')
  })

  it('removes a todo', async () => {
    const todo = makeFakeTodo()
    const removeTodo = makeRemoveTodo({ todoDb, usersDb })
    const user = makeFakeUser()
    const newUser = await usersDb.insert(user)
    const userId = newUser._id
    const newTodo = await todoDb.insert({ userId, ...todo })
    const actual = await removeTodo({ userId, id: newTodo.id.toString() })

    const expected = {
      deletedCount: 1,
      message: 'Todo deleted.',
    }
    expect(actual).toStrictEqual(expected)
  })
})
