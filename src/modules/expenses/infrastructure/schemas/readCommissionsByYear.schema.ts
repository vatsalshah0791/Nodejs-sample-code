'use strict'


import { z } from 'zod'

import { idValidator } from '../shared.import'


export const readCommissionsByYearSchema = z.object({
    body: z.object({
        idClinic: idValidator,
        year: z.number()
    })
})


export type readCommissionsByYearSchemaBodyType = z.infer<typeof readCommissionsByYearSchema>['body']