'use strict'


import { z } from 'zod'

import { idValidator } from '../shared.import'


export const toggleStatusPatientDentalTreatmentSchema = z.object({
    body: z.object({
        status: z.number().max(3).min(1)
    }),
    params: z.object({
        id: idValidator
    })
})


export type toggleStatusPatientDentalTreatmentSchemaParamsType = z.infer<typeof toggleStatusPatientDentalTreatmentSchema>['params']
export type toggleStatusPatientDentalTreatmentSchemaBodyType = z.infer<typeof toggleStatusPatientDentalTreatmentSchema>['body']