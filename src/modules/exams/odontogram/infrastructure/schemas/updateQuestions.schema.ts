'use strict'


import { z } from 'zod'

import { idValidator } from '../shared.import'


export const updateQuestionsSchema = z.object({
    body: z.object({
        option: z.string().max(30).min(2).trim(),
        value: z.boolean()
    }),
    params: z.object({
        id: idValidator
    })
})


export type updateQuestionsSchemaBodyType = z.infer<typeof updateQuestionsSchema>['body']
export type updateQuestionsSchemaParamsType = z.infer<typeof updateQuestionsSchema>['params']