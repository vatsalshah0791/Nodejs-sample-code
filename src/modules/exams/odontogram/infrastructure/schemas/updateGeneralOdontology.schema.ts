'use strict'


import { z } from 'zod'

import { idValidator } from '../shared.import'


export const updateGeneralOdontologySchema = z.object({
    body: z.object({
        option: z.string().max(30).min(2).trim(),
        title: z.string().max(30).min(2).trim(),
        value: z.boolean()
    }),
    params: z.object({
        id: idValidator
    })
})


export type updateGeneralOdontologySchemaBodyType = z.infer<typeof updateGeneralOdontologySchema>['body']
export type updateGeneralOdontologySchemaParamsType = z.infer<typeof updateGeneralOdontologySchema>['params']