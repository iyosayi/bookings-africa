import makeUser from '.'
import { makeFakeUser } from '../../seed/user'

describe('User Factory', () => {
  it('user must have a name', async () => {
    const user = makeFakeUser({ name: null })
    expect(() => makeUser(user)).toThrow('Name cannot be empty, null or undefined.')
  })

  it('user must have an email', async () => {
    const user = makeFakeUser({ email: null })
    expect(() => makeUser(user)).toThrow('Email cannot be empty, null or undefined.')
  })

  it('user must have a password', async () => {
    const user = makeFakeUser({ password: null })
    expect(() => makeUser(user)).toThrow('Password cannot be empty, null or undefined.')
  })

  it('password must be at least 6 characters', async () => {
    const user = makeFakeUser({ password: 'book' })
    expect(() => makeUser(user)).toThrow('Password must be at least 6 characters long.')
  })
})
