'use strict'


import { z } from 'zod'

import { idValidator } from '../shared.import'


export const updateProsthesisMultilineSchema = z.object({
    body: z.object({
        option: z.string().max(30).min(2).trim(),
        title: z.string().max(30).min(2).trim(),
        value: z.boolean()
    }),
    params: z.object({
        id: idValidator
    })
})


export type updateProsthesisMultilineSchemaBodyType = z.infer<typeof updateProsthesisMultilineSchema>['body']
export type updateProsthesisMultilineSchemaParamsType = z.infer<typeof updateProsthesisMultilineSchema>['params']