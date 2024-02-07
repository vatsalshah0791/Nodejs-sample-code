'use strict'


import { z } from 'zod'

import { idValidator } from '../shared.import'


export const readMonthIncomesSchema = z.object({
    body: z.object({
        idClinic: idValidator,
        month: z.number(),
        year: z.number()
    })
})


export type readMonthIncomesSchemaBodyType = z.infer<typeof readMonthIncomesSchema>['body']