import { apiResponse } from '../../helpers/http.response'
import { wrapAsync } from '../../helpers/wrap.async'

const makePostUser = ({ addUser }: { addUser: Function }) => {
  return wrapAsync(async (httpRequest: any) => {
    let { ...userInfo } = httpRequest.body
    const todo = await addUser({ ...userInfo })

    return apiResponse({
      status: true,
      statusCode: 201,
      data: [todo],
      message: 'User created.',
    })
  })
}

export default makePostUser
