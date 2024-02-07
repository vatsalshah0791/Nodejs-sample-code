'use strict'

import { z } from 'zod'

import { idValidator, timeValidator } from '../shared.import'

export const updateAppointmentSchema = z.object({
    body: z.object({
        appointmentDate: z.coerce.date(),
        startTime: timeValidator,
        endingTime: timeValidator,
        annotations: z.string().max(500).min(0),
        idDentalChair: idValidator,
        idCollaborator: idValidator,
        idDentalTreatment: idValidator
    }),
    params: z.object({
        id: idValidator
    })
})

export type updateAppointmentSchemaBodyType = z.infer<typeof updateAppointmentSchema>['body']
export type updateAppointmentSchemaParamsType = z.infer<typeof updateAppointmentSchema>['params']