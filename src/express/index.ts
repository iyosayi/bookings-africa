import { Request, Response } from 'express'

const makeExpressCallback = (controller: Function) => {
  return (req: any, res: Response) => {
    const httpRequest = {
      body: req.body,
      pathParams: req.params,
      query: req.query,
      ip: req.ip,
      method: req.method,
      path: req.path,
      user: req.user,
      headers: {
        'Content-Type': req.get('Content-Type'),
        Referer: req.get('referer'),
        'User-Agent': req.get('User-Agent'),
        'x-auth-token': req.get('x-auth-token'),
      },
    }
    controller(httpRequest)
      .then((httpResponse: any) => {
        if (httpResponse.headers) {
          res.set(httpResponse.headers)
        }

        res.type('json')
        httpResponse.redirect
          ? res.redirect(httpResponse.redirect)
          : res.status(httpResponse.statusCode).send(httpResponse.data)
      })
      .catch((e: any) => res.sendStatus(e.statusCode || 500).send(e.message))
  }
}

export default makeExpressCallback
