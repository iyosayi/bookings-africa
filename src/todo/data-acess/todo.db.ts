import { ID, ITodo, ITodoResult, transformId } from '../interfaces/i.todo'
import { IUserDb } from '../../users/user-interfaces/i.user'

const makeTodoDb = ({ makeDb, usersDb }: { usersDb: IUserDb; makeDb: any }) => {
  async function insert({ userId, ...details }: { userId: string } & ITodo) {
    const db = await makeDb()
    const todo = await db.collection('todos').insertOne({ userId, ...details })
    const { _id: id, ...insertedInfo } = todo.ops[0]
    await usersDb.updateTodo({ id: userId, todoId: id })
    return { id, ...insertedInfo }
  }

  async function update({ id, ...todoInfo }: { id: string } & ITodo) {
    const db = await makeDb()
    const foundTodo = await db.collection('todos').updateOne({ _id: transformId(id) }, { $set: { ...todoInfo } })
    return foundTodo.modifiedCount > 0 ? { _id: id, ...todoInfo } : null
  }

  async function remove({ id: _id }: { id: string }) {
    const db = await makeDb()
    const toDelete = await db.collection('todos').deleteOne({ _id: transformId(_id) })
    return toDelete.deletedCount
  }

  async function findById({ id: _id }: { id: string }) {
    const db = await makeDb()
    const found = await db.collection('todos').findOne({ _id: transformId(_id) })
    return found
  }

  async function findAll() {
    const db = await makeDb()
    const found = await db.collection('todos').find()
    return (await found.toArray()).map(({ _id: id, ...todoItems }: { _id: ID } & ITodoResult) => ({
      id,
      todo_name: todoItems.todo_name,
      priority: todoItems.priority,
      userId: todoItems.userId,
    }))
  }

  async function search({ param }: { param: string }) {
    const db = await makeDb()
    const returnedDoc = await db.collection('todos').find({ $text: { $search: param } })
    return (await returnedDoc.toArray()).map(({ _id: id, ...todoItems }: { _id: ID } & ITodoResult) => ({
      // @ts-ignore
      id,
      ...todoItems,
    }))
  }
  async function dropDb(col: string) {
    const db = await makeDb()
    return db.collection(col).drop()
  }

  return Object.freeze({
    insert,
    findById,
    findAll,
    update,
    remove,
    search,
    dropDb,
  })
}

export default makeTodoDb
