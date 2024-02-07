'use strict'


import { z } from 'zod'

import { idValidator } from '../shared.import'


export const readDentalTreatmentsSchema = z.object({
    params: z.object({
        idClinic: idValidator
    })
})


export type readDentalTreatmentsSchemaParamsType = z.infer<typeof readDentalTreatmentsSchema>['params']