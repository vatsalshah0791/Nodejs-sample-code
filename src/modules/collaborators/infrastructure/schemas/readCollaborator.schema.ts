'use strict'


import { z } from 'zod'

import { idValidator } from '../shared.import'


export const readCollaboratorSchema = z.object({
    params: z.object({
        id: idValidator
    })
})


export type readCollaboratorSchemaParamsType = z.infer<typeof readCollaboratorSchema>['params']