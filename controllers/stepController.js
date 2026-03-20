const db = require('../db')
const { generateHash } = require('../blockchain')

exports.getAllSteps = async (req, res, next) => {
    try {
        const result = await db.query('SELECT * FROM steps ORDER BY id')
        res.json(result.rows)
    } catch (err) {
        next(err)
    }
}

exports.getStepById = async (req, res, next) => {
    try {
        const result = await db.query(
            'SELECT * FROM steps WHERE id = $1',
            [req.params.id]
        )
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Paso no encontrado' })
        }
        res.json(result.rows[0])
    } catch (err) {
        next(err)
    }
}

exports.createStep = async (req, res, next) => {
    try {
        const { name, description } = req.body

        if (!name || !description) {
            return res.status(400).json({ error: 'Nombre y descripción son obligatorios' })
        }

        const result = await db.query(
            'INSERT INTO steps (name, description) VALUES ($1, $2) RETURNING *',
            [name, description]
        )

        const step = result.rows[0]

        // Blockchain logic
        const last = await db.query(
            'SELECT hash FROM step_history ORDER BY id DESC LIMIT 1'
        )
        const previousHash = last.rows[0]?.hash || '0'
        const hash = generateHash(step, previousHash)

        await db.query(
            `INSERT INTO step_history (step_id, action, data, hash, previous_hash)
             VALUES ($1, $2, $3, $4, $5)`,
            [step.id, 'CREATE', step, hash, previousHash]
        )

        res.status(201).json(step)
    } catch (err) {
        next(err)
    }
}

exports.updateStep = async (req, res, next) => {
    try {
        const { id } = req.params
        const { name, description } = req.body

        if (!name || !description) {
            return res.status(400).json({ error: 'Nombre y descripción son obligatorios' })
        }

        const result = await db.query(
            'UPDATE steps SET name = $1, description = $2, updated_at = CURRENT_TIMESTAMP WHERE id = $3 RETURNING *',
            [name, description, id]
        )

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Paso no encontrado' })
        }

        const step = result.rows[0]

        // Blockchain logic for update
        const last = await db.query(
            'SELECT hash FROM step_history ORDER BY id DESC LIMIT 1'
        )
        const previousHash = last.rows[0]?.hash || '0'
        const hash = generateHash(step, previousHash)

        await db.query(
            `INSERT INTO step_history (step_id, action, data, hash, previous_hash)
             VALUES ($1, $2, $3, $4, $5)`,
            [step.id, 'UPDATE', step, hash, previousHash]
        )

        res.json(step)
    } catch (err) {
        next(err)
    }
}
