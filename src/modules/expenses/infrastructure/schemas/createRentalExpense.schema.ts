'use strict'


import { z } from 'zod'

import { idValidator } from '../shared.import'


export const createRentalExpenseSchema = z.object({
    body: z.object({
        rentalName: z.string().min(3).max(100),
        amount: z.number(),
        isAvailable: z.boolean(),
        idClinic: idValidator
    })
})


export type createRentalExpenseSchemaBodyType = z.infer<typeof createRentalExpenseSchema>['body']