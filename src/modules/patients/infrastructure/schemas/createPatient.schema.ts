'use strict'


import { z } from 'zod'

import { idValidator, phonePrefixValidator, phoneNumberValidator } from '../shared.import'


export const createPatientSchema = z.object({
    body: z.object({
        firstName: z.string().max(50).min(2).trim(),
        lastName: z.string().max(50).min(2).trim(),
        username: z.string().max(25).min(5).trim(),
        password: z.string().max(25).min(8),
        confirmPassword: z.string().max(25).min(8),
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
        idClinic: idValidator
    }).refine(data => data.password === data.confirmPassword, { message: 'Passwords do not match' })
})


export type createPatientSchemaBodyType = z.infer<typeof createPatientSchema>['body']