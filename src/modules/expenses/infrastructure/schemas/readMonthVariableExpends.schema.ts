'use strict'


import { z } from 'zod'

import { idValidator } from '../shared.import'


export const readMonthVariableExpendsSchema = z.object({
    body: z.object({
        idClinic: idValidator,
        month: z.number(),
        year: z.number()
    })
})


export type readMonthVariableExpendsSchemaBodyType = z.infer<typeof readMonthVariableExpendsSchema>['body']