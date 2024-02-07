'use strict'


import { z } from 'zod'


export const updateCustomerPaymentInstrumentSchema = z.object({
    params: z.object({
        paymentInstrumentId: z.string().max(40).min(15).trim()
    })
})


export type updateCustomerPaymentInstrumentSchemaParamsTypes = z.infer<typeof updateCustomerPaymentInstrumentSchema>['params']