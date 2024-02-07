'use strict'


import { z } from 'zod'

import { idValidator, floatStringValidator } from '../shared.import'


export const createCollaboratorPaySchema = z.object({
    body: z.object({
        salary: floatStringValidator,
        commission: floatStringValidator,
        month: z.number(),
        year: z.number(),
        idClinic: idValidator
    }),
    params: z.object({
        idCollaborator: idValidator,
    })
})


export type createCollaboratorPaySchemaBodyType = z.infer<typeof createCollaboratorPaySchema>['body']
export type createCollaboratorPaySchemaParamsType = z.infer<typeof createCollaboratorPaySchema>['params']