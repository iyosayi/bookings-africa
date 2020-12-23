import { RequiredParameterError } from '../../helpers/Errors'

const buildAuthFactory = () => {
  return function makeAuth({ email, password }: { email: string; password: string }) {
    if (!email) {
      throw new RequiredParameterError('Email')
    }
    if (!password) {
      throw new RequiredParameterError('Password')
    }

    return Object.freeze({
      getEmail: () => email.toLowerCase(),
      getPassword: () => password,
    })
  }
}

export default buildAuthFactory
