'use strict'


import { z } from 'zod'

import { idValidator } from '../shared.import'


export const updateOverbiteHorizontalSchema = z.object({
    body: z.object({
        value: z.number()
    }),
    params: z.object({
        id: idValidator
    })
})


export type updateOverbiteHorizontalSchemaBodyType = z.infer<typeof updateOverbiteHorizontalSchema>['body']
export type updateOverbiteHorizontalSchemaParamsType = z.infer<typeof updateOverbiteHorizontalSchema>['params']