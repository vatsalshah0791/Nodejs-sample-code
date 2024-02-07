'use strict'


import { z } from 'zod'

import { idValidator, phonePrefixValidator } from '../shared.import'


export const createDoctorSchema = z.object({
    body: z.object({
        firstName: z.string().max(50).min(2).trim(),
        lastName: z.string().max(50).min(2).trim(),
        username: z.string().max(25).min(5).trim(),
        password: z.string().max(25).min(8),
        confirmPassword: z.string().max(25).min(8),
        email: z.string().email(),
        phonePrefix: phonePrefixValidator,
        phone: z.string().max(25).min(5),
        fullAddress: z.string().max(100).min(2),
        birthDate: z.coerce.date(),
        emergencyPhonePrefix: phonePrefixValidator,
        emergencyPhone: z.string().max(25).min(5),
        emergencyName: z.string().max(50).min(2).trim(),
        idGender: idValidator,
        idCountry: idValidator
    }).refine(data => data.password === data.confirmPassword, { message: 'Passwords do not match' })
})


export type createDoctorSchemaBodyType = z.infer<typeof createDoctorSchema>['body']