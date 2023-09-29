const { BadRequestError, NotFoundError } = require('../errors')

const saveVideo = (req, res) => {
    res.status(200).json({ "msg": "Request successfully sent" })
}

module.exports = { saveVideo }