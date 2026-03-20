require('dotenv').config()
const express = require('express')
const cors = require('cors')
const stepsRoutes = require('./routes/steps')
const stepHistoryRoutes = require('./routes/step_history')

const app = express()
app.use(cors())
app.use(express.json())

app.use('/steps', stepsRoutes)
app.use('/step_history', stepHistoryRoutes)

app.listen(3000, () => {
    console.log('Server runing on port 3000')
})