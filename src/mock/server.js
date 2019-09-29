const jsonServer = require('json-server')
const server = jsonServer.create()
const { resolve } = require('path')
const middlewares = jsonServer.defaults()

const routesRouter = jsonServer.router(resolve(__dirname, './routes.json'))

const formatData = (req, res) => {
  let method = req.method
  let message = ''
  if (method === 'DELETE') message = '删除成功！'
  else if (method === 'POST') message = '添加成功！'
  else if (method === 'PUT') message = '修改成功！'
  res.jsonp({
    code: 200,
    message,
    data: res.locals.data
  })
}

routesRouter.render = formatData

server.use(middlewares)
server.use('/routes', routesRouter)
server.listen(3000, () => {
  console.log('JSON Server is running')
})
