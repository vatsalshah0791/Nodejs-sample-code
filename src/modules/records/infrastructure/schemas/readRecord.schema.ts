'use strict'


import { z } from 'zod'

import { idValidator } from '../shared.import'


export const readRecordSchema = z.object({
    params: z.object({
        idPatient: idValidator
    })
})


export type readRecordSchemaParamsType = z.infer<typeof readRecordSchema>['params']