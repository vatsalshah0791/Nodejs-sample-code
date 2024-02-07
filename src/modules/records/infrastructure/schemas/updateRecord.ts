'use strict'


import { z } from 'zod'

import { idValidator } from '../shared.import'


export const updateRecordSchema = z.object({
    body: z.object({
        option: z.string().max(15).min(2).trim(),
        value: z.boolean()
    }),
    params: z.object({
        id: idValidator,
        key: z.string().max(15).min(2).trim()
    })
})


export type updateRecordSchemaBodyType = z.infer<typeof updateRecordSchema>['body']
export type updateRecordSchemaParamsType = z.infer<typeof updateRecordSchema>['params']