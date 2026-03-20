const express = require('express')
const router = express.Router()
const historyController = require('../controllers/historyController')

router.get('/:id/history', historyController.getHistoryByStepId)

module.exports = router