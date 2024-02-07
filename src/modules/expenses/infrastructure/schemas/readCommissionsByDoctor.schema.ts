'use strict'


import { z } from 'zod'

import { idValidator } from '../shared.import'


export const readCommissionsByDoctorSchema = z.object({
    body: z.object({
        idClinic: idValidator,
        idCollaborator: idValidator
    })
})


export type readCommissionsByDoctorSchemaBodyType = z.infer<typeof readCommissionsByDoctorSchema>['body']