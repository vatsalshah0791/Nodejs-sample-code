'use strict'


import { z } from 'zod'

import { idValidator } from '../shared.import'


export const updateAtmSchema = z.object({
    body: z.object({
        option: z.string().max(30).min(1).trim(),
        value: z.boolean()
    }),
    params: z.object({
        id: idValidator,
        key: z.string().max(35).min(2).trim()
    })
})


export type updateAtmSchemaBodyType = z.infer<typeof updateAtmSchema>['body']
export type updateAtmSchemaParamsType = z.infer<typeof updateAtmSchema>['params']