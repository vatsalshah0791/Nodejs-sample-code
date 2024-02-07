'use strict'


import { z } from 'zod'

import { idValidator } from '../shared.import'


export const readProductsSchema = z.object({
    params: z.object({
        idClinic: idValidator
    })
})


export type readProductsSchemaParamsType = z.infer<typeof readProductsSchema>['params']