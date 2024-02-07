'use strict'


import { z } from 'zod'

import { idValidator } from '../shared.import'


export const updateMobilitySchema = z.object({
    body: z.object({
        option: z.string().max(5).min(1).trim(),
        value: z.boolean()
    }),
    params: z.object({
        id: idValidator
    })
})


export type updateMobilitySchemaBodyType = z.infer<typeof updateMobilitySchema>['body']
export type updateMobilitySchemaParamsType = z.infer<typeof updateMobilitySchema>['params']