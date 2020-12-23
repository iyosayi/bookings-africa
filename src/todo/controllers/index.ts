import makePostTodo from './post.todo'
import makePatchTodo from './patch.todo'
import makeGetTodo from './get.todo'
import makeDeleteTodo from './delete.todo'
import makeSearchTodo from './get.search'
import { addTodo, editTodo, removeTodo, listTodo, searchTodo } from '../use-cases'

export const postTodo = makePostTodo({ addTodo })
export const patchTodo = makePatchTodo({ editTodo })
export const getTodo = makeGetTodo({ listTodo })
export const deleteTodo = makeDeleteTodo({ removeTodo })
export const getSearch = makeSearchTodo({ searchTodo })
