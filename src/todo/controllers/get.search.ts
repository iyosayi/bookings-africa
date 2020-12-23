import { apiResponse } from '../../helpers/http.response'
import { wrapAsync } from '../../helpers/wrap.async'

const makeGetSearch = ({ searchTodo }: { searchTodo: Function }) => {
  return wrapAsync(async (httpRequest: any) => {
    const userId = httpRequest.user.id
    const { priority, todo_name } = httpRequest.query
    const todo = await searchTodo({ userId, priority, todo_name })

    return apiResponse({
      status: true,
      statusCode: 200,
      data: todo,
      message: 'Todos.',
    })
  })
}

export default makeGetSearch
