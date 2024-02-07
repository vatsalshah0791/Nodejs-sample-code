'use strict'


import { z } from 'zod'

import { idValidator, floatStringValidator } from '../shared.import'


export const updateDentalTreatmentSchema = z.object({
    body: z.object({
        treatmentName: z.string().max(50).min(2),
        price: floatStringValidator
    }),
    params: z.object({
        id: idValidator
    })
})


export type updateDentalTreatmentSchemaBodyType = z.infer<typeof updateDentalTreatmentSchema>['body']
export type updateDentalTreatmentSchemaParamsType = z.infer<typeof updateDentalTreatmentSchema>['params']