'use strict'


import { z } from 'zod'

import { onlyMonthValidator, onlyYearValidator, postalCodeValidator } from '../shared.import'


export const createCustomerPaymentInstrumentSchema = z.object({
    body: z.object({
        card: z.object({
            number: z.string().max(20).min(12).trim(),
            expirationMonth: onlyMonthValidator,
            expirationYear: onlyYearValidator,
            cvv: z.string().max(4).min(3)
        }),
        firstName: z.string().max(50).min(2),
        lastName: z.string().max(50).min(2),
        address: z.string().max(50).min(2),
        locality: z.string().max(50).min(2),
        postalCode: postalCodeValidator,
        country: z.string().length(2),
        fingerprintSessionId: z.string().max(50).min(5)
    })
})


export type createCustomerPaymentInstrumentSchemaBodyTypes = z.infer<typeof createCustomerPaymentInstrumentSchema>['body']