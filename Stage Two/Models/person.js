const mongoose = require('mongoose')

// Person Schema with validations
const PersonSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        unique: true,
        validate: {
            validator: (val) => {
                return /^\D+$/.test(val)
            },
            message: err => `${err.value} is not valid Name!`
        },
        required: [true, "Name is required to perform any operation"]
    }
})

module.exports = mongoose.model('Person', PersonSchema)