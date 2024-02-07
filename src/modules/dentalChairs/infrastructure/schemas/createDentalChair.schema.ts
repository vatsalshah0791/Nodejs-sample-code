'use strict'


import { z } from 'zod'

import { idValidator } from '../shared.import'


export const createDentalChairSchema = z.object({
    body: z.object({
        chairName: z.string().max(50).min(2),
        idClinic: idValidator
    })
})


export type createDentalChairSchemaBodyType = z.infer<typeof createDentalChairSchema>['body']