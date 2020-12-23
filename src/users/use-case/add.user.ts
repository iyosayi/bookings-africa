import makeUser from '../entities'
import { IUser, IUserDb } from '../user-interfaces/i.user'
import { UniqueConstraintError } from '../../helpers/Errors'

const makeAddUser = ({ usersDb }: { usersDb: IUserDb }) => {
  return async function addUser(userDetails: IUser) {
    const user = makeUser(userDetails)
    const exists = await usersDb.findByEmail({ email: user.getEmail() })
    if (exists) {
      throw new UniqueConstraintError('Email')
    }

    return usersDb.insert({
      name: user.getName(),
      email: user.getEmail(),
      password: user.getPassword(),
      todos: user.getTodos(),
    })
  }
}

export default makeAddUser
