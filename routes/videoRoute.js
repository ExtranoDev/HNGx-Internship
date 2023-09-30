const express = require('express')
const router = express.Router()

const {
    startVideo,
    pauseVideo,
    resumeVideo,
    stopVideo,
    getVideo
} = require('../controllers/videoController')

router.post('/start', startVideo)
router.post('/pause', pauseVideo)
router.post('/resume', resumeVideo)
router.post('/stop', stopVideo)
router.get('/:id', getVideo)

module.exports = router