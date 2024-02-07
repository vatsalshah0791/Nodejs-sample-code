'use strict'


import { z } from 'zod'

import { idValidator } from '../shared.import'


export const readWeekIncomesSchema = z.object({
    body: z.object({
        idClinic: idValidator,
        week: z.number(),
        month: z.number(),
        year: z.number()
    })
})


export type readWeekIncomesSchemaBodyType = z.infer<typeof readWeekIncomesSchema>['body']