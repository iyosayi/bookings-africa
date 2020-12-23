import { apiResponse } from '../../helpers/http.response'
import { wrapAsync } from '../../helpers/wrap.async'

const makeDeleteTodo = ({ removeTodo }: { removeTodo: Function }) => {
  return wrapAsync(async (httpRequest: any) => {
    const { id } = httpRequest.pathParams
    const userId = httpRequest.user.id
    const todo = await removeTodo({ userId, id })

    return apiResponse({
      status: true,
      statusCode: 200,
      data: [todo],
      message: 'Todo deleted successfully.',
    })
  })
}

export default makeDeleteTodo
