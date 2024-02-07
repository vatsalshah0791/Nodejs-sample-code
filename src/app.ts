'use strict'


import express from 'express'
import helmet from 'helmet'
import cors from 'cors'

import { PORT } from './env/.env'

import v1Routes from './routes/v1.routes'
import { dbConnection } from './database/connection'


const app = express()


app.use(helmet())
app.use(cors())
app.use(express.json())
app.use(v1Routes)


dbConnection(() => app.listen(PORT))