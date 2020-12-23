export enum HttpStatusCode {
  OK = 200,
  BAD_REQUEST = 400,
  NOT_FOUND = 404,
  INTERNAL_SERVER = 500,
  UNAUTHORIZED = 401,
  EXISTS = 409,
}

class BaseError extends Error {
  public readonly name: string
  public readonly statusCode: HttpStatusCode
  public readonly isOperational: boolean

  constructor(name: string, statusCode: HttpStatusCode, isOperational: boolean, description: string) {
    super(description)
    Object.setPrototypeOf(this, new.target.prototype)

    this.name = name
    this.statusCode = statusCode
    this.isOperational = isOperational

    Error.captureStackTrace(this)
  }
}

export class RequiredParameterError extends BaseError {
  constructor(public param: string) {
    super(`RequiredParameterError`, HttpStatusCode.BAD_REQUEST, true, `${param} cannot be empty, null or undefined.`)
  }
}

export class InvalidParameterError extends BaseError {
  constructor(public param: string) {
    super(`InvalidParameterError`, HttpStatusCode.BAD_REQUEST, true, `${param}`)
  }
}

export class UniqueConstraintError extends BaseError {
  constructor(public param: string) {
    super('UniqueConstraintError', HttpStatusCode.EXISTS, true, `${param} must be unique.`)
  }
}

export class UnauthorizedError extends BaseError {
  constructor(public param: string) {
    super('UnauthorizedError', HttpStatusCode.UNAUTHORIZED, true, `${param}`)
  }
}
