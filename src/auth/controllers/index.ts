import makePostLogin from './post.login'
import { loginUser } from '../use-case'

export const postLogin = makePostLogin({ loginUser })
