import { IUser, ID } from '../user-interfaces/i.user'
import { ObjectId } from 'mongodb'

function transformId(id: string) {
  return new ObjectId(id)
}

const makeUsersDb = ({
  makeDb,
  hashPassword,
  createToken,
}: {
  makeDb: Function
  hashPassword: Function
  createToken: Function
}) => {
  async function insert({ ...details }: IUser) {
    const db = await makeDb()
    if (details.password) {
      details.password = await hashPassword(details.password)
    }
    const todo = await db.collection('users').insertOne({ ...details })
    const { _id, ...insertedInfo } = todo.ops[0]
    const payload = { id: _id, email: insertedInfo.email }
    const token = await createToken(payload)
    return { _id, ...insertedInfo, token }
  }

  async function findById({ id: _id }: { id: string }) {
    const db = await makeDb()
    const found = await db.collection('users').findOne({ _id: transformId(_id) })
    return found
  }

  async function findByEmail({ email }: { email: string }) {
    const db = await makeDb()
    const found = await db.collection('users').findOne({ email })
    return found
  }

  async function updateTodo({ id, todoId }: { id: string; todoId: ID }) {
    const db = await makeDb()
    const foundTodo = await db.collection('users').updateOne({ _id: transformId(id) }, { $push: { todos: todoId } })
    return foundTodo.modifiedCount > 0 ? { id: todoId } : null
  }

  return Object.freeze({
    insert,
    findById,
    findByEmail,
    updateTodo,
  })
}

export default makeUsersDb
