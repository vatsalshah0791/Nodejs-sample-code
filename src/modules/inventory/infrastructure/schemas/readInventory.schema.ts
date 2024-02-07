'use strict'

import { z } from 'zod'

import { idValidator } from '../shared.import'

export const readInventorySchema = z.object({
    params: z.object({
        idClinic: idValidator,
    })
})

export type readInventorySchemaParamsType = z.infer<typeof readInventorySchema>['params']