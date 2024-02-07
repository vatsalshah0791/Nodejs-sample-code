'use strict'


import { z } from 'zod'

import { idValidator } from '../shared.import'


export const updateOrthodonticsSchema = z.object({
    body: z.object({
        option: z.string().max(30).min(2).trim(),
        value: z.boolean()
    }),
    params: z.object({
        id: idValidator
    })
})


export type updateOrthodonticsSchemaBodyType = z.infer<typeof updateOrthodonticsSchema>['body']
export type updateOrthodonticsSchemaParamsType = z.infer<typeof updateOrthodonticsSchema>['params']