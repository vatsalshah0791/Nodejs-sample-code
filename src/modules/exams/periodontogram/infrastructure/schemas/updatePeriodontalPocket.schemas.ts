'use strict'


import { z } from 'zod'

import { idValidator } from '../shared.import'


export const updatePeriodontalPocketSchema = z.object({
    body: z.object({
        mesial: z.number(),
        central: z.number(),
        distal: z.number()
    }),
    params: z.object({
        id: idValidator
    })
})


export type updatePeriodontalPocketSchemaBodyType = z.infer<typeof updatePeriodontalPocketSchema>['body']
export type updatePeriodontalPocketSchemaParamsType = z.infer<typeof updatePeriodontalPocketSchema>['params']