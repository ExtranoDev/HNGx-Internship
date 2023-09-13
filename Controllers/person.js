const Person = require('../Models/person')

// Capitalize each word in a student name Person name 
const caseConverter = (name) => {
    // sanitize person name
    name = name.replace(/[^a-z0-9áéíóúñü \.,_-]/gim, "");

    // returns Person name with each word capitalised
    return name.split(' ')
        .map((val) => val.charAt(0).toUpperCase() + val.slice(1))
        .join(' ')
}

// function creates a person
const createPerson = async (req, res) => {
    try {
        const copyName = req.body.name
        let parsedName = ""
        if (typeof copyName == 'string') {
            if (copyName.includes(" ")) {
                parsedName = caseConverter(copyName) // perses and converts user input
            } else {
                parsedName = copyName
            }
        }

        // creates a new person
        const person = await Person.create({ name: parsedName })

        // returns appropriate message incase of error
        if (!person) {
            return res.status(404).json({
                msg: `Unable to create Person with name: ${newName}`,
                status: "Failed"
            })
        }

        // display in case of success when creating user
        res.status(201).json({
            person: person,
            msg: "User creation successful",
            status: "Success"
        })
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

// function returns a person object
const getPerson = async (req, res) => {
    try {
        const { userID: personID } = req.params

        // finds a new person
        const person = await Person.findOne({ _id: personID })
        if (!person) {
            return res.status(404).json({
                msg: `No Person with ID ${personID} can be found!!!`,
                status: "Failed"
            })
        }

        // display in case of success when finding user
        res.status(200).json({
            person,
            msg: `Person ${person.name} Found`,
            status: "Success"
        })
    } catch (error) {
        res.status(500).json({ msg: error })
    }
}

// function upates a person object
const updatePerson = async (req, res) => {
    try {
        const { userID: personID } = req.params
        const newPersonName = req.body

        // finds a new person and upadtes
        const person = await Person.findOneAndUpdate(
            { _id: personID },
            newPersonName,
            {
                new: true,
                runValidators: true
            }
        )
        if (!person) {
            return res.status(404).json({
                msg: `No Person with ID ${personID} can be found!!!`,
                status: "Update Failed"
            })
        }

        // display in case of success when finding user
        res.status(200).json({
            msg: `Person ${personID} updated`,
            newDetails: person,
            status: "Success"
        })
    } catch (error) {
        res.status(500).json({ msg: error })
    }
}

// function deletes a person object
const deletePerson = async (req, res) => {
    try {
        const { userID: personID } = req.params

        // finds a new person and delete
        const person = await Person.findOneAndDelete({ _id: personID })
        if (!person) {
            return res.status(404).json({
                msg: `No Person with id: ${personID}`,
                status: "Removal Failed"
            })
        }

        // display in case of success when finding user
        res.status(200).json({
            msg: `${person.name} with id ${personID} deleted`,
            status: "Success"
        })
    } catch (error) {
        res.status(500).json({ msg: error })
    }
}



module.exports = {
    createPerson,
    getPerson,
    updatePerson,
    deletePerson
}