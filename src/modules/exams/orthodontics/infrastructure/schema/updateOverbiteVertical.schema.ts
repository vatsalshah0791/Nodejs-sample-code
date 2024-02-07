'use strict'


import { z } from 'zod'

import { idValidator } from '../shared.import'


export const updateOverbiteVerticalSchema = z.object({
    body: z.object({
        value: z.number()
    }),
    params: z.object({
        id: idValidator
    })
})


export type updateOverbiteVerticalSchemaBodyType = z.infer<typeof updateOverbiteVerticalSchema>['body']
export type updateOverbiteVerticalSchemaParamsType = z.infer<typeof updateOverbiteVerticalSchema>['params']