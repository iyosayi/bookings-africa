import makeAddUser from './add.user'
import { makeFakeUser } from '../../seed/user'
import { makeDb } from '../../__tests__/db'
import makeUsersDb from '../data-access/users.db'
import { IUserDb } from '../user-interfaces/i.user'
import { createToken, hashPassword } from '../../helpers/auth.util'

let usersDb: IUserDb

beforeAll(() => {
  usersDb = makeUsersDb({ makeDb, createToken, hashPassword })
})

describe.skip('Add User', () => {
  it('adds a user into the database', async () => {
    const user = makeFakeUser()
    const addUser = makeAddUser({ usersDb })
    const insertedUser = await addUser(user)
    const expected = {
      name: user.name,
      email: user.email,
      password: insertedUser.password,
      _id: insertedUser._id,
      token: insertedUser.token,
      todos: [],
    }
    expect(insertedUser).toHaveProperty('_id')
    expect(insertedUser).toEqual(expected)
  })

  it('does not accept an existing email', async () => {
    const user = makeFakeUser()
    const addUser = makeAddUser({ usersDb })
    const insertedUser = await addUser(user)
    const userTwo = makeFakeUser({ email: insertedUser.email })
    const expected = {
      name: user.name,
      email: user.email,
      password: insertedUser.password,
      _id: insertedUser._id,
      token: insertedUser.token,
      todos: [],
    }
    expect(insertedUser).toEqual(expected)
    expect(addUser(userTwo)).rejects.toThrow('Email must be unique.')
  })
})
