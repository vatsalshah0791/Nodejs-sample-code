'use strict'


import { z } from 'zod'

import { idValidator, phonePrefixValidator, phoneNumberValidator } from '../shared.import'


export const updateClinicSchema = z.object({
    body: z.object({
        clinicName: z.string().max(50).min(2),
        email: z.string().email(),
        phonePrefix: phonePrefixValidator,
        phone: phoneNumberValidator,
        fullAddress: z.string().max(100).min(2),
        idCountry: idValidator,
        idTimeZone: idValidator,
        idCurrency: idValidator,
    }),
    params: z.object({
        id: idValidator
    })
})

export type UpdateClinicSchemaBodyType = z.infer<typeof updateClinicSchema>['body']
export type UpdateClinicSchemaParamsType = z.infer<typeof updateClinicSchema>['params']