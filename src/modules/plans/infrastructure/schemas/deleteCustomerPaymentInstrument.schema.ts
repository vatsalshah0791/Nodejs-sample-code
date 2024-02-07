'use strict'


import { z } from 'zod'


export const deleteCustomerPaymentInstrumentSchema = z.object({
    params: z.object({
        paymentInstrumentId: z.string().max(40).min(15).trim()
    })
})


export type deleteCustomerPaymentInstrumentSchemaParamsTypes = z.infer<typeof deleteCustomerPaymentInstrumentSchema>['params']