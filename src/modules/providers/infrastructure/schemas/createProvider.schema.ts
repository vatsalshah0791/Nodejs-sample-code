'use strict'


import { z } from 'zod'

import { idValidator, phonePrefixValidator, phoneNumberValidator } from '../shared.import'


export const createProviderSchema = z.object({
    body: z.object({
        title: z.string().max(50).min(2),
        email: z.string().email(),
        fullAddress: z.string().max(100).min(2),
        phonePrefix: phonePrefixValidator,
        phone: phoneNumberValidator,
        website: z.string().url(),
        idProviderType: idValidator,
        idClinic: idValidator
    })
})


export type createProviderSchemaBodyType = z.infer<typeof createProviderSchema>['body']