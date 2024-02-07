'use strict'

import { z } from 'zod'

import { idValidator } from '../shared.import'

export const readInventoryYearSchema = z.object({
    body: z.object({
        idClinic: idValidator,
        year: z.number()
    })
})

export type readInventoryYearSchemaBodyType = z.infer<typeof readInventoryYearSchema>['body']