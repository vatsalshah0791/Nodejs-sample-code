'use strict'


import { z } from 'zod'

import { idValidator } from '../shared.import'


export const readDayIncomesSchema = z.object({
    body: z.object({
        idClinic: idValidator,
        date: z.coerce.date()
    })
})


export type readDayIncomesSchemaBodyType = z.infer<typeof readDayIncomesSchema>['body']