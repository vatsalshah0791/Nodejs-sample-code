'use strict'


import { z } from 'zod'

import { idValidator, floatStringValidator } from '../shared.import'


export const readCollaboratorPaymentsSchema = z.object({
    params: z.object({
        year: floatStringValidator,
        idCollaborator: idValidator,
        idClinic: idValidator
    })
})


export type readCollaboratorPaymentsSchemaParamsType = z.infer<typeof readCollaboratorPaymentsSchema>['params']