'use strict'


import { z } from 'zod'

import { idValidator } from '../shared.import'


export const updateProductSchema = z.object({
    body: z.object({
        productName: z.string().max(50).min(2),
    }),
    params: z.object({
        id: idValidator
    })
})


export type updateProductSchemaBodyType = z.infer<typeof updateProductSchema>['body']
export type updateProductSchemaParamsType = z.infer<typeof updateProductSchema>['params']