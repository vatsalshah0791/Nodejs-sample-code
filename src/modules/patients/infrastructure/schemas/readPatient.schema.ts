'use strict'


import { z } from 'zod'

import { idValidator } from '../shared.import'


export const readPatientSchema = z.object({
    params: z.object({
        id: idValidator
    })
})


export type readPatientSchemaParamsType = z.infer<typeof readPatientSchema>['params']