'use strict'


import { z } from 'zod'

import { idValidator, floatStringValidator } from '../shared.import'


export const createPatientDentalTreatmentSchema = z.object({
    body: z.object({
        treatments: z.array(z.object({
            dentalPiece: z.number(),
            price: floatStringValidator,
            idDentalTreatment: idValidator,
        })).max(10).min(1),
        discount: floatStringValidator,
        isDraft: z.boolean(),
        idPatient: idValidator
    })
})


export type createPatientDentalTreatmentSchemaBodyType = z.infer<typeof createPatientDentalTreatmentSchema>['body']