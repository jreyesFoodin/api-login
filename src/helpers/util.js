module.exports = {
    errorResponse(ctx, error, next, status = 404) {
        ctx.status = status
        ctx.body = {
            success: false,
            error: error.message,
        }
        return next()
    }
}