import { apiResponse } from '../../helpers/http.response'
import { wrapAsync } from '../../helpers/wrap.async'

const makePostTodo = ({ addTodo }: { addTodo: Function }) => {
  return wrapAsync(async (httpRequest: any) => {
    let { ...todoInfo } = httpRequest.body
    const userId = httpRequest.user.id
    const todo = await addTodo({ userId, ...todoInfo })

    return apiResponse({
      status: true,
      statusCode: 201,
      data: [todo],
      message: 'Todo created.',
    })
  })
}

export default makePostTodo
