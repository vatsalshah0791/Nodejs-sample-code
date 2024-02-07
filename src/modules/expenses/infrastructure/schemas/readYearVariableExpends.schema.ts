'use strict'


import { z } from 'zod'

import { idValidator } from '../shared.import'


export const readYearVariableExpendsSchema = z.object({
    body: z.object({
        idClinic: idValidator,
        year: z.number()
    })
})


export type readYearVariableExpendsSchemaBodyType = z.infer<typeof readYearVariableExpendsSchema>['body']