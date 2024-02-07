'use strict'


import { z } from 'zod'

import { idValidator } from '../shared.import'


export const updateFurcationInjurySchema = z.object({
    body: z.object({
        option: z.string().max(5).min(1).trim(),
        value: z.boolean()
    }),
    params: z.object({
        id: idValidator
    })
})


export type updateFurcationInjurySchemaBodyType = z.infer<typeof updateFurcationInjurySchema>['body']
export type updateFurcationInjurySchemaParamsType = z.infer<typeof updateFurcationInjurySchema>['params']