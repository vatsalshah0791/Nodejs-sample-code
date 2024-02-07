'use strict'

import { z } from 'zod'

import { idValidator, timeValidator } from '../shared.import'

export const createAppointmentSchema = z.object({
    body: z.object({
        appointmentDate: z.coerce.date(),
        startTime: timeValidator,
        endingTime: timeValidator,
        annotations: z.string().max(500).min(0),
        idDentalChair: idValidator,
        idCollaborator: idValidator,
        idDentalTreatment: idValidator,
        idPatient: idValidator,
        idClinic: idValidator
    })
})

export type createAppointmentSchemaBodyTypes = z.infer<typeof createAppointmentSchema>['body']