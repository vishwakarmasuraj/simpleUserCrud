const express = require('express')
const router = express.Router()

const stdValidationRule = require('../middleware/studentValidationRule');
const stdValid = require('../middleware/valid')

const stdController = require('../controller/student')
/**
 * 
 */
router.post('/create-student', stdValidationRule.studentValidateRule(), stdValid.validate, stdController.studentAdd)

/**
 * 
 */
router.get('/get-student', stdController.getStudent)

/**
 * 
 */

router.put('/update-student/:id', stdController.updateStudent)

/**
 * 
 */

router.delete('/delete-student/:id', stdController.deleteStudent)



module.exports = router