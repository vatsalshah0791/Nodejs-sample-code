'use strict'


import { z } from 'zod'

import { idValidator } from '../shared.import'


export const updateProsthesisSchema = z.object({
    body: z.object({
        option: z.string().max(30).min(2).trim(),
        value: z.boolean()
    }),
    params: z.object({
        id: idValidator
    })
})


export type updateProsthesisSchemaBodyType = z.infer<typeof updateProsthesisSchema>['body']
export type updateProsthesisSchemaParamsType = z.infer<typeof updateProsthesisSchema>['params']