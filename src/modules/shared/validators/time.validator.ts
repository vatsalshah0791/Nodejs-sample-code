'use strict'


import { z } from 'zod'


const timeFormatRegExp = /^\d{2}:\d{2}$/

export default z.string().refine(value => timeFormatRegExp.test(value), { message: 'The time format is invalid (HH:mm)' })