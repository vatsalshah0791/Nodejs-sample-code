'use strict'


import { z } from 'zod'

import { idValidator } from '../shared.import'


export const updateDentalHistoryNotesSchema = z.object({
    body: z.object({
        note: z.string().max(500).min(0)
    }),
    params: z.object({
        id: idValidator
    })
})


export type updateDentalHistoryNotesSchemaBodyType = z.infer<typeof updateDentalHistoryNotesSchema>['body']
export type updateDentalHistoryNotesSchemaParamsType = z.infer<typeof updateDentalHistoryNotesSchema>['params']