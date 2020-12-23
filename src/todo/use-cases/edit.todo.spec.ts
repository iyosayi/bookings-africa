import { makeEditTodo } from './edit.todo'
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

describe('Edit todo', () => {
  afterEach(() => {
    return todoDb.dropDb('todos')
  })

  it('successfully edits a todo', async () => {
    const todo = makeFakeTodo({ priority: 'low' })
    const user = makeFakeUser()
    const newUser = await usersDb.insert(user)
    const userId = newUser._id
    const newTodo = await todoDb.insert({ userId, ...todo })
    const editTodo = makeEditTodo({ todoDb, usersDb })
    // @ts-ignore
    const editedTodo = await editTodo({ userId, ...newTodo, id: newTodo.id.toString(), todo_name: 'Sweep the house' })
    expect(editedTodo?.todo_name).toBe('Sweep the house')
  })

  it('does not allow you edit another persons todo', async () => {
    const todo = makeFakeTodo()
    const user = makeFakeUser()
    const newUser = await usersDb.insert(user)
    const userId = newUser._id
    const editTodo = makeEditTodo({ todoDb, usersDb })
    const inserted = await todoDb.insert({ userId, ...todo })
    // @ts-ignore
    const actual = { userId, ...inserted, id: new ObjectId().toString(), todo_name: 'blowww' }
    expect(editTodo(actual)).rejects.toThrow('You cannot edit another persons todo.')
  })
})
