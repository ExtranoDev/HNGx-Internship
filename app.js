const express = require('express')
const app = express()
const PORT = process.env.PORT || 3030

app.get("/", (req, res) => {
    res.status(200).json({"Usage": "Append /api?slack_name=ExtranoDev&track=backend"})   
})

app.get("/api", (req, res) => {
    const { slack_name, track } = req.query
    const date = new Date()

    const dayList = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]

    if(slack_name && track) {
        const queryResponse = {
            "slack_name": slack_name,
            "current_day": dayList[date.getDay()],
            "utc_time": date.toISOString().split('.')[0]+"Z",
            "track": track,
            "github_file_url": "https://github.com/ExtranoDev/HNGx-Internship/blob/main/app.js",
            "github_repo_url": "https://github.com/ExtranoDev/HNGx-Internship",
            "status_code": 200
        }
        return res.status(200).json(queryResponse)
    }
    res.send(400).json({"Usage": "Append /api?slack_name=ExtranoDev&track=backend"})   
})

app.listen(PORT, (req, res) => {
    console.log(`Server is running on PORT: ${PORT}......`)
})