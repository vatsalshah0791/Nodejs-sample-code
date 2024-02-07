'use strict'

import { z } from 'zod'

import { idValidator, floatStringValidator } from '../shared.import'

export const createBillSchema = z.object({
    body: z.object({
        no: z.string().max(100).min(2).trim(),
        date: z.coerce.date(),
        idProvider: idValidator,
        idClinic: idValidator,
        items: z.array(z.object({
            amount: z.number(),
            unitPrice: floatStringValidator,
            idProduct: idValidator
        }))
    })
})

export type createBillSchemaBodyType = z.infer<typeof createBillSchema>['body']