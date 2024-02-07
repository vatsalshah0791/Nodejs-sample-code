'use strict'


import { z } from 'zod'

import { idValidator } from '../shared.import'


export const updateDiagnosisSchema = z.object({
    body: z.object({
        option: z.string().max(30).min(2).trim(),
        value: z.boolean()
    }),
    params: z.object({
        id: idValidator
    })
})


export type updateDiagnosisSchemaBodyType = z.infer<typeof updateDiagnosisSchema>['body']
export type updateDiagnosisSchemaParamsType = z.infer<typeof updateDiagnosisSchema>['params']