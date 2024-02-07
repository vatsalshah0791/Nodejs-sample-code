'use strict'


import { z } from 'zod'

import { idValidator } from '../shared.import'


export const readPatientDentalTreatmentsConfirmedSchema = z.object({
    params: z.object({
        idPatient: idValidator
    })
})

export type readPatientDentalTreatmentsConfirmedSchemaParamsType = z.infer<typeof readPatientDentalTreatmentsConfirmedSchema>['params']