'use strict'


import { z } from 'zod'

import {
    idValidator,
    phonePrefixValidator,
    phoneNumberValidator
} from '../shared.import'


export const updateAdminAccountSchema = z.object({
    body: z.object({
        firstName: z.string().max(50).min(2).trim(),
        lastName: z.string().max(50).min(2).trim(),
        phonePrefix: phonePrefixValidator.optional(),
        phone: phoneNumberValidator.optional(),
        companyName: z.string().max(50).min(2),
        birthDate: z.coerce.date(),
        idGender: idValidator,
        idCountry: idValidator
    }).refine(data => typeof data.phonePrefix === typeof data.phone, { message: 'Wrong phone number.' })
})


export type updateAdminAccountSchemaBodyType = z.infer<typeof updateAdminAccountSchema>['body']