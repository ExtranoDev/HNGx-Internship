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
    saveChunckVideo,
    getSRTFile,
    uploadAll
} = require('../controllers/videoController')

router.post('/save', upload.single('file'), saveChunckVideo)
router.get('/start', startVideo)
router.post('/upload', uploadAll)
router.post('/pause', pauseVideo)
router.post('/resume', resumeVideo)
router.post('/stop', upload.single('file'), stopVideo)
router.get('/:id', getVideo)
router.get('/srt/:id', getSRTFile)

module.exports = router