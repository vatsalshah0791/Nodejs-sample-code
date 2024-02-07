'use strict'


import { z } from 'zod'

import { idValidator } from '../shared.import'


export const readYearExpensesByProviderTypeSchema = z.object({
    body: z.object({
        idClinic: idValidator,
        idProviderType: idValidator,
        year: z.number()
    })
})


export type readYearExpensesByProviderTypeSchemaBodyType = z.infer<typeof readYearExpensesByProviderTypeSchema>['body']