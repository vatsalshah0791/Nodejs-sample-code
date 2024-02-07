'use strict'


import { z } from 'zod'

import { idValidator } from '../shared.import'


export const updateAtmMultilineSchema = z.object({
    body: z.object({
        option: z.string().max(30).min(2).trim(),
        title: z.string().max(30).min(2).trim(),
        value: z.boolean()
    }),
    params: z.object({
        key: z.string().max(30).min(2).trim(),
        id: idValidator
    })
})


export type updateAtmMultilineSchemaBodyType = z.infer<typeof updateAtmMultilineSchema>['body']
export type updateAtmMultilineSchemaParamsType = z.infer<typeof updateAtmMultilineSchema>['params']