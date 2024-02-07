'use strict'


import { z } from 'zod'

import { idValidator } from '../shared.import'


export const createProducSchema = z.object({
    body: z.object({
        productName: z.string().max(50).min(2),
        idClinic: idValidator
    })
})


export type createProducSchemaBodyType = z.infer<typeof createProducSchema>['body']