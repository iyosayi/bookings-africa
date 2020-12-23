import { InvalidParameterError } from '../../helpers/Errors'
import { IUserDb } from '../../users/user-interfaces/i.user'

const makeListUser = ({usersDb}: {usersDb: IUserDb}) => {
  return async function listUser({ id }: {id: string}) {
    const user = await usersDb.findById({ id })
    if (!user) {
      throw new InvalidParameterError('User does not exist.')
    }
    return user
  }
}

export default makeListUser
