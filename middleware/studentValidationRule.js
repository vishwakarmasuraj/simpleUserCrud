const { body } = require('express-validator')
const Student = require('../models/student')

const studentValidateRule = () => {
    return [
        body('title').notEmpty(),
        body('name').notEmpty()
            .custom((value) => {
                return Student.findOne({ name: value }).then((user) => {
                    if (user) {
                        return Promise.reject('name is already exist')
                    }
                })
            }),
        body('lastName').notEmpty(),
        body('email').notEmpty()
            .custom(value => {
                return Student.findOne({ email: value }).then(user => {
                    if (user) {
                        return Promise.reject('email is already exist')
                    }
                })
            }),
        body('password').notEmpty().isLength({ min: 6 }),
        body('address').notEmpty(),
        body('mobileNumber').notEmpty()
            .custom(value => {
                return Student.findOne({ mobileNumber: value }).then(user => {
                    if (user) {
                        return Promise.reject('Mobile number is already exist')
                    }
                })
            }),
        body('college').notEmpty(),
        body('branch').notEmpty(),
        body('status').notEmpty()
    ]
}

module.exports = { studentValidateRule }