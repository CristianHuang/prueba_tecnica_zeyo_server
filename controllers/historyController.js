const db = require('../db')

exports.getHistoryByStepId = async (req, res, next) => {
    try {
        const { id } = req.params

        const result = await db.query(
            'SELECT * FROM step_history WHERE step_id=$1 ORDER BY id',
            [id]
        )

        res.json(result.rows)
    } catch (err) {
        next(err)
    }
}
