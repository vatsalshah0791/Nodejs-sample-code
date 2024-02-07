'use strict'


import { z } from 'zod'

import { idValidator } from '../shared.import'


export const signupSchema = z.object({
    body: z.object({
        firstName: z.string().max(50).min(2).trim(),
        lastName: z.string().max(50).min(2).trim(),
        username: z.string().max(25).min(5).trim(),
        email: z.string().email(),
        password: z.string().max(25).min(8),
        confirmPassword: z.string().max(25).min(8),
        companyName: z.string().max(50).min(2),
        idGender: idValidator,
        idCountry: idValidator
    }).refine(data => data.password === data.confirmPassword, { message: 'Passwords do not match' })
})


export type signupSchemaBodyType = z.infer<typeof signupSchema>['body']