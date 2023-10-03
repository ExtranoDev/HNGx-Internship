const express = require("express")
const fs = require("fs")
const path = require("path")
const cors = require("cors")
const notFoundMiddleware = require('./middleware/not-found')
const errorHandleMiddleware = require('./middleware/error-handler')
const videoRouter = require('./routes/videoRoute')

// Setting up doc
const swaggerUI = require('swagger-ui-express')
const YAML = require('yamljs')
const swaggerDocument = YAML.load('./swagger.yaml')


const app = express()

const PORT = process.env.PORT || 3000; // Port definition

app.use(express.static('./public'))
app.use(express.json())
app.use(cors())

app.use('/api/video', videoRouter)
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument))
// app.use('/', (req, res) => {
//     res.status(200).send('Video API Home')
// })

app.use(notFoundMiddleware)
app.use(errorHandleMiddleware)

app.listen(PORT, (req, res) => {
    if (!fs.existsSync('./controllers/videos')) {
        fs.mkdirSync('./controllers/videos')
    }
    console.log(`Server listening on PORT: ${PORT}...`)
})