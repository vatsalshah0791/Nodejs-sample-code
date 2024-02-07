'use strict'


import { z } from 'zod'

import { idValidator } from '../shared.import'


export const updateExamNotesSchema = z.object({
    body: z.object({
        note: z.string().max(500).min(0)
    }),
    params: z.object({
        id: idValidator
    })
})


export type updateExamNotesSchemaBodyType = z.infer<typeof updateExamNotesSchema>['body']
export type updateExamNotesSchemaParamsType = z.infer<typeof updateExamNotesSchema>['params']