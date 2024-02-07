'use strict'


import { z } from 'zod'


const phoneNumberRegExp = /^\d+$/

export default z.string().max(25).min(5).trim().refine(value => phoneNumberRegExp.test(value), { message: 'It must contain only integers.' })