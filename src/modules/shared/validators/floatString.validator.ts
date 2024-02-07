'use strict'


import { z } from 'zod'


export default z.string().max(15).min(1).trim().refine(value => !isNaN(parseFloat(value)), { message: 'not a valid number' })