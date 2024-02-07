'use strict'


import { z } from 'zod'

import { idValidator } from '../shared.import'


export const readCommissionsByMonthSchema = z.object({
    body: z.object({
        idClinic: idValidator,
        month: z.number(),
        year: z.number()
    })
})


export type readCommissionsByMonthSchemaBodyType = z.infer<typeof readCommissionsByMonthSchema>['body']