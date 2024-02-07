'use strict'


import { z } from 'zod'

import { idValidator } from '../shared.import'


export const updateRentalExpenseSchema = z.object({
    params: z.object({
        id: idValidator
    }),
    body: z.object({
        rentalName: z.string().min(3).max(100),
        amount: z.number(),
        isAvailable: z.boolean()
    })
})


export type updateRentalExpenseSchemaBodyType = z.infer<typeof updateRentalExpenseSchema>['body']
export type updateRentalExpenseSchemaParamsType = z.infer<typeof updateRentalExpenseSchema>['params']