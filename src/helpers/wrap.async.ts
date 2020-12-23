import { makeHttpError } from './http.response'
import { Request, Response } from 'express'

export const wrapAsync = (fn: Function) => (req: Request, res: Response) =>
  fn(req, res).catch((error: Error) => {
    console.log('error', error)
    return makeHttpError({
      errorMessage: error.message,
      title: error.name,
      stack: error.stack,
      statusCode: error.statusCode,
    })
  })
