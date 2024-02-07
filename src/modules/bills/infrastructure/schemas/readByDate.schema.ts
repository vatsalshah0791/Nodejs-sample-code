'use strict'

import { z } from 'zod'

import { idValidator } from '../shared.import'

export const readByDateSchema = z.object({
    body: z.object({
        month: z.number(),
        year: z.number(),
        idClinic: idValidator
    })
})

export type readByDateSchemaBodyType = z.infer<typeof readByDateSchema>['body']