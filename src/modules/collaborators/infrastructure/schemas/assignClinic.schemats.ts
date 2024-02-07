'use strict'


import { z } from 'zod'

import { idValidator, floatStringValidator } from '../shared.import'


export const assignClinicSchema = z.object({
    body: z.object({
        salary: floatStringValidator,
        commission: floatStringValidator,
        idClinic: idValidator
    }),
    params: z.object({
        idCollaborator: idValidator,
    })
})


export type assignClinicSchemaBodyType = z.infer<typeof assignClinicSchema>['body']
export type assignClinicSchemaParamsType = z.infer<typeof assignClinicSchema>['params']