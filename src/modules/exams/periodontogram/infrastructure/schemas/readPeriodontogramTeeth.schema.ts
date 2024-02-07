'use strict'


import { z } from 'zod'

import { idValidator } from '../shared.import'


export const readPeriodontogramTeethSchema = z.object({
    params: z.object({
        idPatient: idValidator,
        teeth: z.string().max(3).min(1).trim()
    })
})


export type readPeriodontogramTeethSchemaParamsType = z.infer<typeof readPeriodontogramTeethSchema>['params']