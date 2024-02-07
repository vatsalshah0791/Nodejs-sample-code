'use strict'


import { z } from 'zod'

import { idValidator } from '../shared.import'


export const readPaymentsByPatientSchema = z.object({
    params: z.object({
        idPatient: idValidator
    })
})


export type readPaymentsByPatientSchemaParamsType = z.infer<typeof readPaymentsByPatientSchema>['params']