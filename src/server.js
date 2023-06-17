const Koa = require('koa')
const cors = require('kcors')
const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')
const koaBody = require('koa-body')
const serve = require('koa-static-server')

const app = new Koa()
const router = new Router()
const environment = process.env.NODE_ENV || 'development'

router.get('/', async (ctx, next) => {
  ctx.body = 'api V1'
})

require('./router/Auth/auth')(router)

if (environment === 'production') {
  console.log('Initializing helmet...')
  const helmet = require('koa-helmet')
  app.use(helmet())
}

app.use(cors())
app.use(koaBody({multipart: true, formidable: {maxFileSize: 10000000}}))
app.use(bodyParser())
app.use(router.routes()).use(router.allowedMethods())
app.use(serve({rootDir: 'public', rootPath: '/public'}))

app.on('error', (err, ctx) => {
  console.error(`[ERROR] in (${ctx.path}): `, err)
})

module.exports = app
