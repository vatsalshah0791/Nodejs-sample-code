'use strict'

import { z } from 'zod'

import { idValidator } from '../shared.import'

export const updateStockSchema = z.object({
    body: z.object({
        subtrahend: z.number()
    }),
    params: z.object({
        idStock: idValidator
    })
})

export type updateStockSchemaParamsType = z.infer<typeof updateStockSchema>['params']
export type updateStockSchemaBodyType = z.infer<typeof updateStockSchema>['body']