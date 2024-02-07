'use strict'


import { z } from 'zod'

import { idValidator, phonePrefixValidator, phoneNumberValidator } from '../shared.import'


export const updateProviderSchema = z.object({
    body: z.object({
        title: z.string().max(50).min(2),
        email: z.string().email(),
        fullAddress: z.string().max(100).min(2),
        phonePrefix: phonePrefixValidator,
        phone: phoneNumberValidator,
        website: z.string().url(),
        idProviderType: idValidator
    }),
    params: z.object({
        id: idValidator
    })
})


export type updateProviderSchemaBodyType = z.infer<typeof updateProviderSchema>['body']
export type updateProviderSchemaParamsType = z.infer<typeof updateProviderSchema>['params']