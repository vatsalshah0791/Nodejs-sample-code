'use strict'


import { z } from 'zod'

import { idValidator } from '../shared.import'


export const updateIsAdultSchema = z.object({
    body: z.object({
        isAdult: z.boolean()
    }),
    params: z.object({
        id: idValidator
    })
})


export type updateIsAdultSchemaBodyType = z.infer<typeof updateIsAdultSchema>['body']
export type updateIsAdultSchemaParamsType = z.infer<typeof updateIsAdultSchema>['params']