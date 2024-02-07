'use strict'


import { z } from 'zod'


const postalCodeRegExp = /^\d{5}(-\d{4})?$/


export default z.string().regex(postalCodeRegExp)