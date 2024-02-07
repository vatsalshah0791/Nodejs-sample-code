'use strict'


import { z } from 'zod'

import { idValidator } from '../shared.import'


export const readCollaboratorsUnassignedSchema = z.object({
    params: z.object({
        idClinic: idValidator
    })
})


export type readCollaboratorsUnassignedSchemaParamsType = z.infer<typeof readCollaboratorsUnassignedSchema>['params']