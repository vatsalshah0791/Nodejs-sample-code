'use strict'


import { z } from 'zod'

import { idValidator } from '../shared.import'


export const readProvidersSchema = z.object({
    params: z.object({
        idClinic: idValidator
    })
})


export type readProvidersSchemaParamsType = z.infer<typeof readProvidersSchema>['params']