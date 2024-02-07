'use strict'


import { z } from 'zod'

import { idValidator } from '../shared.import'


export const updateServiceExpenseSchema = z.object({
    params: z.object({
        id: idValidator
    }),
    body: z.object({
        serviceName: z.string().min(3).max(100),
        amount: z.number(),
        isAvailable: z.boolean()
    })
})


export type updateServiceExpenseSchemaBodyType = z.infer<typeof updateServiceExpenseSchema>['body']
export type updateServiceExpenseSchemaParamsType = z.infer<typeof updateServiceExpenseSchema>['params']