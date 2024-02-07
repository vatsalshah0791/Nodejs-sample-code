'use strict'


import { z } from 'zod'

import { idValidator } from '../shared.import'


export const updatePatientDentalTreatmentSchema = z.object({
    params: z.object({
        id: idValidator
    })
})


export type updatePatientDentalTreatmentSchemaParamsType = z.infer<typeof updatePatientDentalTreatmentSchema>['params']