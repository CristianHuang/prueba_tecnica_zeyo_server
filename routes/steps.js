const express = require('express')
const router = express.Router()
const stepController = require('../controllers/stepController')

router.get('/', stepController.getAllSteps)
router.get('/:id', stepController.getStepById)
router.post('/', stepController.createStep)
router.put('/:id', stepController.updateStep)

module.exports = router