'use strict'


import { z } from 'zod'

import { idValidator } from '../shared.import'


export const readFixedCostsSchema = z.object({
    params: z.object({
        idClinic: idValidator
    })
})


export type readFixedCostsSchemaParamsType = z.infer<typeof readFixedCostsSchema>['params']