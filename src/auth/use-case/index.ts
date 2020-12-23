import makeLoginUser from './login.user'
import { createToken, validatePassword } from '../../helpers/auth.util'
import usersDb from '../../users/data-access'

export const loginUser = makeLoginUser({ createToken, validatePassword, usersDb })
