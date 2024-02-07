'use strict'


import { z } from 'zod'

import { idValidator } from '../shared.import'


export const readPaymentsByTreatmentSchema = z.object({
    params: z.object({
        idPatientDentalTreatment: idValidator
    })
})


export type readPaymentsByTreatmentSchemaParamsType = z.infer<typeof readPaymentsByTreatmentSchema>['params']