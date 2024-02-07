'use strict'


import { z } from 'zod'

import { idValidator } from '../shared.import'


export const createServiceExpenseSchema = z.object({
    body: z.object({
        serviceName: z.string().min(3).max(100),
        amount: z.number(),
        isAvailable: z.boolean(),
        idClinic: idValidator
    })
})


export type createServiceExpenseSchemaBodyType = z.infer<typeof createServiceExpenseSchema>['body']