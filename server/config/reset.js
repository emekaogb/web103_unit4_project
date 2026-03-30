import dotenv from 'dotenv'
dotenv.config({ path: 'server/.env' })
import { pool } from "./database.js"

const createJournlasTable = async () => {
    const createTableQuery = `
        DROP TABLE IF EXISTS journals;

        CREATE TABLE IF NOT EXISTS journals (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            color VARCHAR(255) NOT NULL,
            icon VARCHAR(255) NOT NULL,
            size VARCHAR(255) NOT NULL,
            paper VARCHAR(255) NOT NULL,
            accessories TEXT[]
        )
    `

    try {
        const res = await pool.query(createTableQuery)
        console.log('journals table created successfully')
    } catch (err) {
        console.error('error creating journals table', err)
    }
}

createJournlasTable()