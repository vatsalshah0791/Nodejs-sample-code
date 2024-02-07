'use strict'


import { z } from 'zod'

import { idValidator } from '../shared.import'


export const updateDuctsSchema = z.object({
    body: z.object({
        option: z.string().max(30).min(2).trim(),
        length: z.string().max(50).min(2).trim(),
        instrumentation: z.string().max(50).min(2).trim()
    }),
    params: z.object({
        id: idValidator
    })
})


export type updateDuctsSchemaBodyType = z.infer<typeof updateDuctsSchema>['body']
export type updateDuctsSchemaParamsType = z.infer<typeof updateDuctsSchema>['params']