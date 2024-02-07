'use strict'


import { z } from 'zod'

import { idValidator } from '../shared.import'


export const readDentalChairsSchema = z.object({
    params: z.object({
        idClinic: idValidator
    })
})


export type readDentalChairsSchemaParamsType = z.infer<typeof readDentalChairsSchema>['params']