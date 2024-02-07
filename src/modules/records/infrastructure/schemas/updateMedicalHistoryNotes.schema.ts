'use strict'


import { z } from 'zod'

import { idValidator } from '../shared.import'


export const updateMedicalHistoryNotesSchema = z.object({
    body: z.object({
        note: z.string().max(500).min(0)
    }),
    params: z.object({
        id: idValidator
    })
})


export type updateMedicalHistoryNotesSchemaBodyType = z.infer<typeof updateMedicalHistoryNotesSchema>['body']
export type updateMedicalHistoryNotesSchemaParamsType = z.infer<typeof updateMedicalHistoryNotesSchema>['params']