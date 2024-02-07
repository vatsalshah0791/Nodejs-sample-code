'use strict'


import { z } from 'zod'

import { idValidator } from '../shared.import'


export const updateEndodonticsSchema = z.object({
    body: z.object({
        option: z.string().max(30).min(2).trim(),
        value: z.boolean()
    }),
    params: z.object({
        id: idValidator
    })
})


export type updateEndodonticsSchemaBodyType = z.infer<typeof updateEndodonticsSchema>['body']
export type updateEndodonticsSchemaParamsType = z.infer<typeof updateEndodonticsSchema>['params']