const express = require('express')
const router = express.Router()
const {
    getPerson,
    createPerson,
    updatePerson,
    deletePerson
} = require('../Controllers/person')

router.route('/').post(createPerson)

router.route('/:userID')
    .get(getPerson)
    .patch(updatePerson)
    .delete(deletePerson)

module.exports = router