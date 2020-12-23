import { apiResponse } from '../../helpers/http.response'
import { wrapAsync } from '../../helpers/wrap.async'


const makeGetTodo = ({ listTodo }: { listTodo: Function }) => {
  return wrapAsync(async (httpRequest: any) => {
    const { id } = httpRequest.pathParams
    const userId = httpRequest.user.id
    const todo = await listTodo({userId,  id })

    return apiResponse({
      status: true,
      statusCode: 200,
      data: [todo],
      message: 'Todos.',
    })
  })
}

export default makeGetTodo
