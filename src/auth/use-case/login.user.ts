import makeAuth from '../entities'
import { InvalidParameterError } from '../../helpers/Errors'
import { ID, IUserDb } from '../../users/user-interfaces/i.user'

interface IAuth {
  email: string
  password: string
}

interface IUserId {
  email: string
  id: ID
}

interface IDependencies {
  usersDb: IUserDb
  validatePassword: (password: string, password2: string) => Promise<boolean>
  createToken: (details: IUserId) => string
}
const makeLoginUser = (dependencies: IDependencies) => {
  const { usersDb, validatePassword, createToken } = dependencies
  return async function loginUser(userInfo: IAuth) {
    const user = makeAuth(userInfo)

    const exists = await usersDb.findByEmail({
      email: user.getEmail(),
    })
    if (!exists) {
      throw new InvalidParameterError('User does not exist.')
    }

    const password = await validatePassword(user.getPassword(), exists.password)
    if (!password) {
      throw new InvalidParameterError('Password is incorrect.')
    }
    const payload = {
      id: exists._id,
      email: exists.email,
    }

    const token = createToken(payload)
    return token
  }
}

export default makeLoginUser
