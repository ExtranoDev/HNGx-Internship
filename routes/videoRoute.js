const express = require('express')
const router = express.Router()
const multer = require('multer')


const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

const {
    startVideo,
    pauseVideo,
    resumeVideo,
    stopVideo,
    getVideo,
    saveChunckVideo
} = require('../controllers/videoController')

router.post('/save', upload.single('file'), saveChunckVideo)
router.post('/start', startVideo)
router.post('/pause', pauseVideo)
router.post('/resume', resumeVideo)
router.post('/stop', upload.single('file'), stopVideo)
router.get('/:id', getVideo)

module.exports = router