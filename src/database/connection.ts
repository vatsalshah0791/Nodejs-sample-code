'use strict'


import fs from 'fs'
import path from 'path'
import { Pool } from 'pg'

import { DB_HOST, DB_USERNAME, DB_PASSWORD, DB_PORT, DB_DATABASE } from '../env/.env'


const certificatePath: string = path.resolve('ca-certificate.crt')
let pool: Pool


export const dbConnection = async (callback: Function) => {
    try {
        pool = new Pool({
            host: DB_HOST,
            user: DB_USERNAME,
            password: DB_PASSWORD,
            port: Number(DB_PORT),
            database: DB_DATABASE,
            ssl: {
                rejectUnauthorized: true,
                ca: fs.readFileSync(certificatePath).toString()
            }
        })
        console.log(`
            #########################
                C O N E C T E D!
            #########################
        `)
        await callback()
    } catch (error) {
        console.error(error)
    }
}


export const db = (): Pool => pool