'use strict'


import { z } from 'zod'

import { idValidator } from '../shared.import'


export const updateOtherExpenseSchema = z.object({
    params: z.object({
        id: idValidator
    }),
    body: z.object({
        otherExpense: z.string().min(3).max(100),
        amount: z.number(),
        isAvailable: z.boolean()
    })
})


export type updateOtherExpenseSchemaBodyType = z.infer<typeof updateOtherExpenseSchema>['body']
export type updateOtherExpenseSchemaParamsType = z.infer<typeof updateOtherExpenseSchema>['params']