'use strict'

import { z } from 'zod'

import { idValidator } from '../shared.import'

export const readBillSchema = z.object({
    params: z.object({
        id: idValidator
    })
})

export type readBillSchemaParamsType = z.infer<typeof readBillSchema>['params']