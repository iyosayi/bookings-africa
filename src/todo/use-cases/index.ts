import { makeAddTodo } from './add.todo'
import { makeEditTodo } from './edit.todo'
import { makeListTodo } from './list.todo'
import { makeRemoveTodo } from './remove.todo'
import { makeSearchTodo } from './search.todo'
import todoDb from '../data-acess'
import usersDb from '../../users/data-access'

export const addTodo = makeAddTodo({ todoDb })
export const editTodo = makeEditTodo({ usersDb, todoDb })
export const listTodo = makeListTodo({ usersDb, todoDb })
export const removeTodo = makeRemoveTodo({ usersDb, todoDb })
export const searchTodo = makeSearchTodo({ todoDb, usersDb })
