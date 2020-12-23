import { InvalidParameterError, RequiredParameterError } from '../../helpers/Errors'
import { IUser } from '../user-interfaces/i.user'

const buildMakeUserFactory = () =>
  function makeUser(userDetails: IUser) {
    const { name, email, password } = userDetails
    let {todos} = userDetails
    todos = []
    if (!name) {
      throw new RequiredParameterError('Name')
    }

    if (!email) {
      throw new RequiredParameterError('Email')
    }

    if (!password) {
      throw new RequiredParameterError('Password')
    }

    if (password.length < 6) {
      throw new InvalidParameterError('Password must be at least 6 characters long.')
    }

    return Object.freeze({
      getName: () => name,
      getEmail: () => email.toLowerCase(),
      getPassword: () => password,
      getTodos: () => todos
    })
  }

export default buildMakeUserFactory
