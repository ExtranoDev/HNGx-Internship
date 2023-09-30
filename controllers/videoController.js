require('dotenv').config()
const fs = require('fs')
const path = require('path')
const { Deepgram } = require('@deepgram/sdk')
const ffmpegStatic = require('ffmpeg-static')
const { BadRequestError, NotFoundError } = require('../errors')

let videoChunks = []
let videoID
const deepgram = new Deepgram(process.env.DEEP_KEY)

const saveChunckVideo = async () => {
    const { data } = req.body
    console.log(data)
    await videoChunks.push(Buffer.concat([data]))
}

const startVideo = async (req, res) => {
    videoChunks = [] // clears previous video
    // await recorder.startRecording()
    videoID = Math.floor(Math.random() * 9000000000) + 1000000000 //generated video ID
    res.status(200).json({ "msg": "Video begins", videoID })
}

const pauseVideo = async (req, res) => {
    // await recorder.pauseRecording(async () => {
    //     const blob = recorder.getBlob()
    // })

    saveChunckVideo()
    res.status(200).json({ "msg": "Video paused", videoID })
}


const resumeVideo = async (req, res) => {
    // await recorder.resumeRecording()
    res.status(200).json({ "msg": "Video resumed", videoID })
}

const stopVideo = async (req, res) => {
    // await recorder.stopRecording(async () => {
    //     const blob = recorder.getBlob()
    //     videoChunks.push(Buffer.concat([blob]))
    //     const videoBuffer = Buffer.concat(videoChunks)
    //     const videoPath = path.join(__dirname, 'videos', `${videoID}.webm`)
    //     fs.writeFileSync(videoPath, videoBuffer)
    // })

    saveChunckVideo()
    const videoBuffer = await Buffer.concat(videoChunks)
    const videoPath = await path.join(__dirname, 'videos', `${videoID}.webm`)
    await fs.writeFileSync(videoPath, videoBuffer)
    videoChunks = []
    res.status(200).json({ "msg": "Video stopped", videoID })
}

const getVideo = async () => {
    const { id } = req.body

    filePath = `../videos/${id}.webm`

    ffmpegStatic(`-hide_banner -y -i ${filePath} ${filePath}.wav`)

    const audioFile = {
        buffer: fs.readFileSync(`${filePath}.wav`),
        mimeType: 'audio/wav'
    }

    const transData = await deepgram.transcription.preRecorded(audioFile, {
        punctuation: true
    })

    res.json({
        "status": 'Video recovered', "filePath": `/videos/${id}.webm`,
        "transcription": transData.results
    })
}


module.exports = {
    startVideo,
    pauseVideo,
    resumeVideo,
    stopVideo,
    getVideo,
    saveChunckVideo
}