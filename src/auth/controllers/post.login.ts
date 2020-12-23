import { wrapAsync } from '../../helpers/wrap.async'
import { apiResponse } from '../../helpers/http.response'

const makePostLogin = ({ loginUser }: { loginUser: Function }) => {
  return wrapAsync(async (httpRequest: any) => {
    const { ...userInfo } = httpRequest.body
    const token = await loginUser({ ...userInfo })
    return apiResponse({
      status: true,
      statusCode: 200,
      message: 'Authorized',
      data: token,
    })
  })
}

export default makePostLogin
