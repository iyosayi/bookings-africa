import makeTodoDb from './todo.db'
import { makeDb } from '../../database/index'
import usersDb from '../../users/data-access'

const todoDb = makeTodoDb({ makeDb, usersDb })
export default todoDb
