require('dotenv').config()
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffmpeg = require('fluent-ffmpeg');
const fs = require('fs')
const path = require('path')
const { Deepgram } = require('@deepgram/sdk')
ffmpeg.setFfmpegPath(ffmpegPath);
const { BadRequestError, NotFoundError } = require('../errors');

let videoChunks = []
let videoID
const deepgram = new Deepgram(process.env.DEEP_KEY)


const convert2audio = (videoPath, outputPath) => {
    return new Promise((resolve, reject) => {
        ffmpeg(videoPath)
            .output(outputPath)
            .audioCodec('pcm_s16le')
            .toFormat('wav')
            .on('end', () => {
                console.log('Conversion complete');
                resolve();
            })
            .on('error', (err) => {
                console.log('Conversion error', err);
                reject(err);
            })
            .run()
    });
}

const saveChunckVideo = async (req, res) => {
    try {
        const fileData = req.file
        await videoChunks.push(fileData.buffer)
    } catch (error) {
        throw new BadRequestError("Invalid Blob file")
    }

}

const startVideo = (req, res) => {
    try {
        videoChunks = [] // clears previous video
        // await recorder.startRecording()
        videoID = Math.floor(Math.random() * 9000000000) + 1000000000 //generated video ID
        res.status(200).json({ "msg": "Video begins", videoID })
    } catch (error) {
        res.status(401).json({ "msg": "Unable to start Video" })
    }

}

const pauseVideo = async (req, res) => {
    try {
        await saveChunckVideo(req, res)
        res.status(200).json({ "msg": "Video paused", videoID })
    } catch (error) {
        throw new BadRequestError("Unable to pause video")
    }
}

const resumeVideo = (req, res) => {
    res.status(200).json({ "msg": "Video resumed", videoID })
}

const stopVideo = async (req, res) => {
    try {
        await saveChunckVideo(req, res)
        const videoBuffer = await Buffer.concat(videoChunks)
        const folderPath = path.join(__dirname, 'videos', `${videoID}`)
        console.log(folderPath)

        const videoPath = folderPath + '.webm'

        await fs.writeFileSync(videoPath, videoBuffer)
        videoChunks = []

        await getTranscribe(folderPath, videoID)
        res.status(200).json({ "msg": "Video stopped", videoID })
    } catch (error) {
        throw new BadRequestError("Unable to stop video an error occured")
    }

}

const getTranscribe = async (folderPath, id) => {
    if (!fs.existsSync(`${folderPath}.wav`)) {
        filePath = `${folderPath}.webm`

        await convert2audio(filePath, `${folderPath}.wav`)
            .then(() => {
                console.log('Conversion successfull')
            })
            .catch((err) => {
                console.log('An error occured: ', err)
            })

        const audioFile = {
            buffer: fs.readFileSync(`${folderPath}.wav`),
            mimetype: 'audio/wav'
        }

        const transData = await deepgram.transcription.preRecorded(audioFile, {
            punctuation: true,
            utterances: true
        })
        const srtTranscript = await transData.toSRT()
        await fs.writeFileSync(`${folderPath}.srt`, srtTranscript, (err) => {
            if (err) {
                throw err
            } else {
                console.log('Done!!!')
            }
        })
    }
}

const getVideo = async (req, res) => {
    try {
        const { id } = req.params
        const range = req.headers.range
        folderPath = path.join(__dirname, `videos/${id}`)
        filePath = folderPath + '.mp4'

        const videoSize = fs.statSync(filePath).size
        const chunkSize = 1 * 1e6;
        const start = Number(range.replace(/\D/g, ""))
        const end = Math.min(start + chunkSize, videoSize - 1)
        const videoLength = end - start + 1;

        const headers = {
            "Content-Range": `bytes ${start}-${end}/${videoSize}`,
            "Accept-Ranges": "bytes",
            "Content-Length": videoLength,
            "Content-Type": "video/mp4"
        }
        res.writeHead(206, headers)
        const stream = await fs.createReadStream(filePath, { start, end })

        // res.end({
        //     "status": 'Video acced',
        //     "videoPath": `${folderPath}.mp4`,
        //     "transcription": transData.results
        // })

        stream.pipe(res)
    } catch (NotFoundError) {
        throw new NotFoundError("Can't find the ID'ied video")
    }
}

module.exports = {
    startVideo,
    pauseVideo,
    resumeVideo,
    stopVideo,
    getVideo,
    saveChunckVideo
}