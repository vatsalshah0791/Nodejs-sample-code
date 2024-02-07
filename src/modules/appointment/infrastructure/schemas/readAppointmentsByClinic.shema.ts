'use strict'

import { z } from 'zod'

import { idValidator } from '../shared.import'

export const readAppointmentsByClinicSchema = z.object({
    params: z.object({
        idClinic: idValidator
    })
})

export type readAppointmentsByClinicSchemaParamsType = z.infer<typeof readAppointmentsByClinicSchema>['params']