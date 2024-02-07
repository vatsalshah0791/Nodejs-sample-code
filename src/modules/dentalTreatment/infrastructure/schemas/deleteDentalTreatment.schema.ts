'use strict'


import { z } from 'zod'

import { idValidator } from '../shared.import'


export const deleteDentalTreatmentSchema = z.object({
    params: z.object({
        id: idValidator
    })
})


export type deleteDentalTreatmentSchemaParamsType = z.infer<typeof deleteDentalTreatmentSchema>['params']