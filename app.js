const express = require('express')
const app = express()
const person = require('./Routes/person')
const connectDB = require('./db/connect')
require('dotenv').config()

const PORT = process.env.PORT || 5000

// middleware
app.use(express.json())

app.get('/', (req, res) => {
    res.status(200).send('At Home')
})

app.use('/api', person)


const initiate = async () => {
    try {
        await connectDB(process.env.DB_URI)
        app.listen(PORT, (req, res) => {
            console.log(`Server is listening on port ${PORT}...`)
        })
    } catch (error) {
        console.log(error)
    }
}

initiate()

