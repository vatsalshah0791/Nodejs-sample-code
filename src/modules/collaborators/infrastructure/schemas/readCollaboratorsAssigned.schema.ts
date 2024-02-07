'use strict'


import { z } from 'zod'

import { idValidator } from '../shared.import'


export const readCollaboratorsAssignedSchema = z.object({
    params: z.object({
        idClinic: idValidator
    })
})


export type readCollaboratorsAssignedSchemaParamsType = z.infer<typeof readCollaboratorsAssignedSchema>['params']