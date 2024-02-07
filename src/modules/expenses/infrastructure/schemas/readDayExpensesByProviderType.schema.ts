'use strict'


import { z } from 'zod'

import { idValidator } from '../shared.import'


export const readDayExpensesByProviderTypeSchema = z.object({
    body: z.object({
        idClinic: idValidator,
        idProviderType: idValidator,
        date: z.coerce.date()
    })
})


export type readDayExpensesByProviderTypeSchemaBodyType = z.infer<typeof readDayExpensesByProviderTypeSchema>['body']