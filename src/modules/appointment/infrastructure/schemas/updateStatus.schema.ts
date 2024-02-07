'use strict'

import { z } from 'zod'

import { idValidator } from '../shared.import'

export const updateStatuSchema = z.object({
    body: z.object({
        status: z.number()
    }),
    params: z.object({
        id: idValidator
    })
})

export type updateStatuSchemaParamsType = z.infer<typeof updateStatuSchema>['params']
export type updateStatuSchemaBodyType = z.infer<typeof updateStatuSchema>['body']