'use strict'


import { z } from 'zod'

import { idValidator, phonePrefixValidator, phoneNumberValidator } from '../shared.import'


export const createClinicSchema = z.object({
    body: z.object({
        clinicName: z.string().max(50).min(2),
        email: z.string().email(),
        phonePrefix: phonePrefixValidator,
        phone: phoneNumberValidator,
        fullAddress: z.string().max(100).min(2),
        idCountry: idValidator,
        idTimeZone: idValidator,
        idCurrency: idValidator
    })
})

export type createClinicSchemaBodyType = z.infer<typeof createClinicSchema>['body']