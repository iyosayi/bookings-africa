import makeUsersDb from './users.db'
import { makeDb } from '../../database'
import {createToken, hashPassword} from '../../helpers/auth.util'

const usersDb = makeUsersDb({ makeDb, createToken, hashPassword })
export default usersDb
