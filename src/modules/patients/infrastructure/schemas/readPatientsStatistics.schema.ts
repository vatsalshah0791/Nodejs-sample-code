'use strict'


import { z } from 'zod'

import { idValidator } from '../shared.import'


export const readPatientsStatisticsSchema = z.object({
    params: z.object({
        id: idValidator
    })
})


export type readPatientsStatisticsSchemaParamsType = z.infer<typeof readPatientsStatisticsSchema>['params']