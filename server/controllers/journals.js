import { pool } from "../config/database.js"

const getJournals = async (req, res) => {
    try {
        const results = await pool.query('SELECT * FROM journals ORDER BY id ASC')
        res.status(200).json(results.rows)
    } catch (error) {
        res.status(409).json({error: error.message})
    }
}

const createJournal = async (req, res) => {
    try {
        const { name, color, icon, size, paper, accessories } = req.body
        const results = await pool.query(`
            INSERT INTO journals (name, color, icon, size, paper, accessories)
            VALUES($1, $2, $3, $4, $5, $6)
            RETURNING *`,
            [name, color, icon, size, paper, accessories]
        )
        res.status(200).json(results.rows[0])
    } catch (error) {
        res.status(409).json({error: error.message})
    }
}

const updateJournal = async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        const { name, color, icon, size, paper, accessories } = req.body
        const results = await pool.query(`
            UPDATE journals SET name = $1, color = $2, icon = $3, size = $4, paper = $5, accessproes = $6 WHERE id = $7`,
            [name, color, icon, size, paper, accessories, id]
        )
        res.status(200).json(results.rows[0])
    } catch (error) {
        res.status(409).json({error: error.message})
    }
}

const deleteJournal = async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        const results = await pool.query('DELETE FROM journals WHERE id = $1', [id])
        res.status(200).json(results.rows[0])
    } catch (error) {
        res.status(409).json({error: error.message})
    }
}

export default {
    getJournals,
    createJournal,
    updateJournal,
    deleteJournal
}