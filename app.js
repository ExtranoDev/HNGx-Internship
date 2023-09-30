const express = require("express")
const fs = require("fs")
const path = require("path")
const notFoundMiddleware = require('./middleware/not-found')
const errorHandleMiddleware = require('./middleware/error-handler')
const videoRouter = require('./routes/videoRoute')
const app = express()

const PORT = process.env.PORT || 3000; // Port definition

app.use(express.json())

app.use('/api/video', videoRouter)
app.use('/', (req, res) => {
    res.status(200).send('Video API Home')
})

app.use(notFoundMiddleware)
app.use(errorHandleMiddleware)

app.listen(PORT, (req, res) => {
    if (!fs.existsSync('./videos')) {
        fs.mkdirSync('./videos')
    }
    console.log(`Server listening on PORT: ${PORT}...`)
})