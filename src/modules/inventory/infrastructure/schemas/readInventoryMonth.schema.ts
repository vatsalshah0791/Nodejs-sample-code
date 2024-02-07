'use strict'

import { z } from 'zod'

import { idValidator } from '../shared.import'

export const readInventoryMonthSchema = z.object({
    body: z.object({
        idClinic: idValidator,
        month: z.number(),
        year: z.number()
    })
})

export type readInventoryMonthSchemaBodyType = z.infer<typeof readInventoryMonthSchema>['body']