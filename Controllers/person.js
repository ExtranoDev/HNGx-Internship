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

const convertToString = (name) => {
    return name.toString()
}

// Space in parameters should be replaced with '-'
// function converts api paramter to a format db will understand
const paramParser = (name) => {
    return name.split('-').join(' ')
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
        const { userID: personName } = req.params
        let newName = ""
        personName = convertToString(personName)
        if (personName.includes('-')) {
            newName = caseConverter(paramParser(personName)) // parses user input
        } else {
            newName = personName
        }

        // finds a new person
        const person = await Person.findOne({ name: newName })
        if (!person) {
            return res.status(404).json({
                msg: `No Person with name ${newName} can be found!!!`,
                status: "Failed"
            })
        }

        // display in case of success when finding user
        res.status(200).json({
            person,
            msg: `Person ${newName} Found`,
            status: "Success"
        })
    } catch (error) {
        res.status(500).json({ msg: error })
    }
}

// function upates a person object
const updatePerson = async (req, res) => {
    try {
        const { userID: personName } = req.params
        const newPersonName = req.body
        let newName = ""
        personName = convertToString(personName)
        newPersonName.name = convertToString(newPersonName.name)
        if (personName.includes('-')) {
            // parses user input
            newName = caseConverter(paramParser(personName))
            newPersonName.name = caseConverter(paramParser(newPersonName.name))
        } else {
            newName = personName
        }

        // finds a new person and upadtes
        const person = await Person.findOneAndUpdate(
            { name: newName },
            newPersonName,
            {
                new: true,
                runValidators: true
            }
        )
        if (!person) {
            return res.status(404).json({
                msg: `No Person with name ${newName} can be found!!!`,
                status: "Update Failed"
            })
        }

        // display in case of success when finding user
        res.status(200).json({
            msg: `Person ${newName} updated`,
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
        const { userID: personName } = req.params
        let newName = ""
        personName = convertToString(personName)
        if (personName.includes('-')) {
            newName = caseConverter(paramParser(personName)) //parses input
        } else {
            newName = personName
        }

        // finds a new person and delete
        const person = await Person.findOneAndDelete({ name: newName })
        if (!person) {
            return res.status(404).json({
                msg: `No Person with name: ${newName}`,
                status: "Removal Failed"
            })
        }

        // display in case of success when finding user
        res.status(200).json({
            msg: `${newName} deleted`,
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