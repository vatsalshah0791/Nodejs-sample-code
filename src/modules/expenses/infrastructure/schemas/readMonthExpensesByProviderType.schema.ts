'use strict'


import { z } from 'zod'

import { idValidator } from '../shared.import'


export const readMonthExpensesByProviderTypeSchema = z.object({
    body: z.object({
        idClinic: idValidator,
        idProviderType: idValidator,
        month: z.number(),
        year: z.number()
    })
})


export type readMonthExpensesByProviderTypeSchemaBodyType = z.infer<typeof readMonthExpensesByProviderTypeSchema>['body']