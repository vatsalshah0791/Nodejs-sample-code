'use strict'

import { z } from 'zod'

import { idValidator } from '../shared.import'

export const readAppointmentSchema = z.object({
    params: z.object({
        id: idValidator
    })
})

export type readAppointmentSchemaParamsType = z.infer<typeof readAppointmentSchema>['params']