'use strict'


import { z } from 'zod'

import { idValidator } from '../shared.import'


export const readPatientDentalTreatmentsDraftsSchema = z.object({
    params: z.object({
        idPatient: idValidator
    })
})


export type readPatientDentalTreatmentsDraftsSchemaParamsType = z.infer<typeof readPatientDentalTreatmentsDraftsSchema>['params']