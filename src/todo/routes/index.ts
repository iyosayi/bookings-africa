import snakeCase from 'lodash/snakeCase'
import { Router, Application } from 'express'
import { readdirSync } from 'fs'

module.exports = (app: Application) => {
  readdirSync(__dirname).forEach((file) => {
    if (file === 'index.js') return
    const router = Router()
    const routeModule = require(require('path').join(__dirname, file))
    const path = routeModule.path || `/${file !== 'root.js' ? snakeCase(file.replace('.js', '')) : ''}`
    const route = routeModule.config ? routeModule.config(router) : routeModule(router)
    app.use(path, route)
  })
}
