'use strict'


import { z } from 'zod'

import { idValidator } from '../shared.import'


export const updateXRaysSchema = z.object({
    body: z.object({
        option: z.string().max(30).min(2).trim(),
        title: z.string().max(30).min(2).trim(),
        value: z.boolean()
    }),
    params: z.object({
        id: idValidator
    })
})


export type updateXRaysSchemaBodyType = z.infer<typeof updateXRaysSchema>['body']
export type updateXRaysSchemaParamsType = z.infer<typeof updateXRaysSchema>['params']