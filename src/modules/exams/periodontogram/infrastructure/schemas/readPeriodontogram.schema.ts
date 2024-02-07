'use strict'


import { z } from 'zod'

import { idValidator } from '../shared.import'


export const readPeriodontogramSchema = z.object({
    params: z.object({
        idPatient: idValidator
    })
})


export type readPeriodontogramSchemaParamsType = z.infer<typeof readPeriodontogramSchema>['params']