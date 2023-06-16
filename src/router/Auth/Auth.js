const { errorResponse } = require('../../helpers/util')

module.exports = (router) => {
    router.get('/auth/user/:id', async (ctx, next) => {
        try {
            console.log('=>')
        } catch (error) {
            return errorResponse(ctx, error, next)
        }
    })
    router.post('/auth/user', async (ctx, next) => {
        try {
            console.log('=>')
        } catch (error) {
            return errorResponse(ctx, error, next)
        }
    })
}