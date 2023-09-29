const express = require('express')
const router = express.Router()

const { saveVideo } = require('../controllers/videoController')

router.route('/').post(saveVideo)

module.exports = router