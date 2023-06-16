const auth = require('../../usecases/auth')
const authMiddleware = require('../../middleware/auth')

const { errorResponse } = require('../../helpers/util')

module.exports = (router) => {
  router.post('/auth/login', async (ctx, next) => {
    try {
      let payload = await auth.signIn(ctx.request.body)
      ctx.body = {
        success: true,
        ...payload
      }
    } catch (error) {
      return errorResponse(ctx, error, next)
    }
  })

  router.post('/auth/signup', async (ctx, next) => {
    try {
      let payload = await auth.signup(ctx.request.body)
      ctx.body = {
        success: true,
        ...payload
      }
    } catch (error) {
      console.log('ctx, error, next', ctx, error, next)
      return errorResponse(ctx, error, next)
    }
  })

  router.get('/auth/user', authMiddleware(), async (ctx, next) => {
    try {
      let payload = await auth.validateSession(ctx.user)
      ctx.body = {
        success: true,
        ...payload
      }
      return next()
    } catch (error) {
      return errorResponse(ctx, error, next)
    }
  })
}
