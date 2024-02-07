'use strict'


import { z } from 'zod'

import { idValidator } from '../shared.import'


export const deleteFixedCostsSchema = z.object({
    params: z.object({
        id: idValidator
    })
})


export type deleteFixedCostsSchemaParamsType = z.infer<typeof deleteFixedCostsSchema>['params']