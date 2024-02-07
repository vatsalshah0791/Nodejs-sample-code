'use strict'


import { z } from 'zod'

import { idValidator } from '../shared.import'


export const readWeekExpensesByProviderTypeSchema = z.object({
    body: z.object({
        idClinic: idValidator,
        idProviderType: idValidator,
        week: z.number(),
        month: z.number(),
        year: z.number()
    })
})


export type readWeekExpensesByProviderTypeSchemaBodyType = z.infer<typeof readWeekExpensesByProviderTypeSchema>['body']