'use strict'


import { z } from 'zod'

import { idValidator, floatStringValidator } from '../shared.import'


export const createDentalTreatmentSchema = z.object({
    body: z.object({
        treatmentName: z.string().max(50).min(2),
        price: floatStringValidator,
        idClinic: idValidator
    })
})


export type createDentalTreatmentSchemaBodyType = z.infer<typeof createDentalTreatmentSchema>['body']