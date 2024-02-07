'use strict'


import { z } from 'zod'


const yearRegExp = /^(20[0-9]{2}|2[1-9][0-9]{2})$/


export default z.string().regex(yearRegExp)