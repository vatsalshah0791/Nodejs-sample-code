'use strict'


import { z } from 'zod'


const phonePrefixRegExp = /^\+\d+$/

export default z.string().max(10).min(2).trim().refine(value => phonePrefixRegExp.test(value), { message: 'It is not a telephone prefix.' })