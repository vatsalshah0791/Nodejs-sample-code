'use strict'


import { z } from 'zod'

import { idValidator } from '../shared.import'


export const updateDentalChairSchema = z.object({
    body: z.object({
        chairName: z.string().max(50).min(2),
        isAvailable: z.boolean()
    }),
    params: z.object({
        id: idValidator
    })
})


export type updateDentalChairSchemaBodyType = z.infer<typeof updateDentalChairSchema>['body']
export type updateDentalChairSchemaParamsType = z.infer<typeof updateDentalChairSchema>['params']