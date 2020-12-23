import makeLoginUser from './login.user'
import { createToken, validatePassword, hashPassword } from '../../helpers/auth.util'
import { makeFakeUser } from '../../seed/user'
import { IUserDb } from '../../users/user-interfaces/i.user'
import makeUsersDb from '../../users/data-access/users.db'
import { makeDb } from '../../__tests__/db'

let usersDb: IUserDb
beforeAll(() => {
  usersDb = makeUsersDb({ makeDb, createToken, hashPassword })
})

describe('Login User', () => {
  it('logs in a user', async () => {
    const user = makeFakeUser({ password: 'bookingsafrica' })
    const insertedUser = await usersDb.insert(user)
    const { email } = insertedUser
    const loginUser = makeLoginUser({ usersDb, createToken, validatePassword })
    const returnedToken = await loginUser({ email, password: 'bookingsafrica' })
    expect(returnedToken.length).toBeGreaterThan(10)
  })

  it('throws when no user is found', async () => {
    const user = makeFakeUser()
    const inserted = await usersDb.insert(user)
    const loginUser = makeLoginUser({ usersDb, createToken, validatePassword })
    const actual = { email: 'johndoe@gmail.com', password: inserted.password }
    expect(loginUser(actual)).rejects.toThrow('User does not exist.')
  })

  it('handles wrong password', async () => {
    const user = makeFakeUser()
    const inserted = await usersDb.insert(user)
    const loginUser = makeLoginUser({ usersDb, createToken, validatePassword })
    const actual = { email: inserted.email, password: 'john1234' }
    expect(loginUser(actual)).rejects.toThrow('Password is incorrect.')
  })
})
