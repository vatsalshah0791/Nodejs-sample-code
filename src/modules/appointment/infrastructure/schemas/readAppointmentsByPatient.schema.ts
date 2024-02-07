'use strict'

import { z } from 'zod'

import { idValidator } from '../shared.import'

export const readAppointmentsByPatientSchema = z.object({
    params: z.object({
        idPatient: idValidator
    })
})

export type readAppointmentsByPatientSchemaParamsType = z.infer<typeof readAppointmentsByPatientSchema>['params']