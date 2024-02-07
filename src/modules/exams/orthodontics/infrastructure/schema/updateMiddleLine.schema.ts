'use strict'


import { z } from 'zod'

import { idValidator } from '../shared.import'


export const updateMiddleLineSchema = z.object({
    body: z.object({
        coincident: z.number(),
        mandibular: z.number(),
        maxillary: z.number()
    }),
    params: z.object({
        id: idValidator
    })
})


export type updateMiddleLineSchemaBodyType = z.infer<typeof updateMiddleLineSchema>['body']
export type updateMiddleLineSchemaParamsType = z.infer<typeof updateMiddleLineSchema>['params']