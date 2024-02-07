'use strict'


import { z } from 'zod'

import { idValidator } from '../shared.import'


export const deleteProductSchema = z.object({
    params: z.object({
        id: idValidator
    })
})


export type deleteProductSchemaParamsType = z.infer<typeof deleteProductSchema>['params']