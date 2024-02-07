'use strict'


import { z } from 'zod'

import { idValidator } from '../shared.import'


export const createOtherExpenseSchema = z.object({
    body: z.object({
        otherExpense: z.string().min(3).max(100),
        amount: z.number(),
        isAvailable: z.boolean(),
        idClinic: idValidator
    })
})


export type createOtherExpenseSchemaBodyType = z.infer<typeof createOtherExpenseSchema>['body']