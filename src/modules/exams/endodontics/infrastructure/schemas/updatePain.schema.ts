'use strict'


import { z } from 'zod'

import { idValidator } from '../shared.import'


export const updatePainSchema = z.object({
    body: z.object({
        option: z.string().max(30).min(2).trim(),
        title: z.string().max(30).min(2).trim(),
        value: z.boolean()
    }),
    params: z.object({
        id: idValidator
    })
})


export type updatePainSchemaBodyType = z.infer<typeof updatePainSchema>['body']
export type updatePainSchemaParamsType = z.infer<typeof updatePainSchema>['params']