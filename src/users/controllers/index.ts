import makePostUser from './post.user'
import { addUser } from '../use-case'

export const postUser = makePostUser({ addUser })
