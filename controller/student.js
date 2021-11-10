const Student = require('../models/student')
const constants = require('./../constant/allConstants')
const { successHandler, errorHandler } = require('./../helper/responseHandler')
const bcrypt = require('bcrypt')

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */

const studentAdd = async (req, res) => {
    try {
        req.body.password = await bcrypt.hash(req.body.password, constants.ROUND)
        const student = await new Student(req.body)
        console.log(student)
        await student.save()
        successHandler(res, constants.STUDENT_CREATE_SUCCESS)
    } catch (error) {
        return errorHandler(res, error)
    }
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */

const getStudent = async (req, res) => {
    try {
        const result = await Student.find({})
        successHandler(res, constants.GET_ALL_STUDENT, result)
    } catch (error) {
        return errorHandler(res, error)
    }
}

const updateStudent = async (req, res) => {
    try {
        const result = await Student.findByIdAndUpdate({ _id: req.params.id }, { $set: req.body }).select('-password')
        console.log('result', result)
        successHandler(res, constants.STUDENT_UPDATE_MSG, result)
    } catch (error) {
        errorHandler(res, error)
    }
}

const deleteStudent = async (req, res) => {
    try {
        const id = req.params.id
        const result = await Student.findByIdAndRemove({ _id: id })
        console.log(result)
        successHandler(res, constants.STUDENT_DEL_MSG, result)
    } catch (error) {
        return errorHandler(res, constants.ERR_MSG)
    }
}

module.exports = { studentAdd, getStudent, updateStudent, deleteStudent }