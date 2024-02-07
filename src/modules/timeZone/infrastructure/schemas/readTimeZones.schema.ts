'use strict'


import { z } from 'zod'

import idValidator from '../../../shared/validators/id.validator'


export const readTimeZonesSchema = z.object({
    params: z.object({
        idCountry: idValidator
    })
})

export type readTimeZonesSchemaParamsType = z.infer<typeof readTimeZonesSchema>['params']