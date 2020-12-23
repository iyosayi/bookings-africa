interface IHttpError {
  statusCode: number
  title: string
  stack: string | undefined
  errorMessage: string
}

interface IHttpSuccess {
  status: boolean
  statusCode: number
  message: string
  data: any
}

export const makeHttpError = (error: IHttpError) => {
  const { title, errorMessage, stack, statusCode } = error
  const toReturn = {
    errors: [
      {
        title,
        error: errorMessage,
        stack,
      },
    ],
  }

  return {
    headers: {
      'Content-Type': 'application/json',
    },
    statusCode,
    data: JSON.stringify(toReturn),
  }
}

export const apiResponse = (response: IHttpSuccess) => {
  const { statusCode, status, message, data } = response
  const toReturn = {
    message,
    data,
  }
  return {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    status,
    statusCode,
    data: JSON.stringify(toReturn),
  }
}
