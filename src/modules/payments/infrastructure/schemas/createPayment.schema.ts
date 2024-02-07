'use strict'


import { z } from 'zod'

import { idValidator, floatStringValidator } from '../shared.import'


export const createPaymentSchema = z.object({
    body: z.object({
        amount: floatStringValidator,
        idPaymentMethod: idValidator,
        idDoctor: idValidator,
        idPatientDentalTreatment: idValidator
    })
})


export type createPaymentSchemaBodyType = z.infer<typeof createPaymentSchema>['body']