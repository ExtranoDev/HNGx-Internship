const { StatusCodes } = require('http-status-codes')
const errorHandleMiddleware = (err, req, res, next) => {
    let customError = {
        statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        msg: err.message || 'Something is not right...'
    }

    return res.status(customError.statusCode).json({ message: customError.msg })
}

module.exports = errorHandleMiddleware