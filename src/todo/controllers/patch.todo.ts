import { apiResponse } from '../../helpers/http.response'
import { wrapAsync } from '../../helpers/wrap.async'

const makePatchTodo = ({ editTodo }: { editTodo: Function }) => {
  return wrapAsync(async (httpRequest: any) => {
    let { ...todoInfo } = httpRequest.body
    const { id } = httpRequest.pathParams
    const userId = httpRequest.user.id
    const todo = await editTodo({ userId, id, ...todoInfo })

    return apiResponse({
      status: true,
      statusCode: 200,
      data: [todo],
      message: 'Todo updated successfully.',
    })
  })
}

export default makePatchTodo
