'use strict'


import { z } from 'zod'

import { idValidator } from '../shared.import'


export const readOdontogramSchema = z.object({
    params: z.object({
        idPatient: idValidator
    })
})


export type readOdontogramSchemaParamsType = z.infer<typeof readOdontogramSchema>['params']