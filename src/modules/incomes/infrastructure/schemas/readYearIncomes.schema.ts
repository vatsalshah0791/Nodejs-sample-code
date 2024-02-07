'use strict'


import { z } from 'zod'

import { idValidator } from '../shared.import'


export const readYearIncomesSchema = z.object({
    body: z.object({
        idClinic: idValidator,
        year: z.number()
    })
})


export type readYearIncomesSchemaBodyType = z.infer<typeof readYearIncomesSchema>['body']