'use strict'


import { z } from 'zod'

import { idValidator, phonePrefixValidator, phoneNumberValidator } from '../shared.import'


export const updatePatientSchema = z.object({
    body: z.object({
        firstName: z.string().max(50).min(2).trim(),
        lastName: z.string().max(50).min(2).trim(),
        email: z.string().email(),
        phonePrefix: phonePrefixValidator,
        phone: phoneNumberValidator,
        fullAddress: z.string().max(100).min(2),
        workplace: z.string().max(100).min(2),
        recommendedBy: z.string().max(100).min(2).optional(),
        birthDate: z.coerce.date(),
        emergencyPhonePrefix: phonePrefixValidator,
        emergencyPhone: phoneNumberValidator,
        emergencyName: z.string().max(50).min(2).trim(),
        idGender: idValidator,
        idCountry: idValidator,
        idDoctor: idValidator,
    }),
    params: z.object({
        id: idValidator
    })
})


export type updatePatientSchemaBodyType = z.infer<typeof updatePatientSchema>['body']
export type updatePatientSchemaParamsType = z.infer<typeof updatePatientSchema>['params']