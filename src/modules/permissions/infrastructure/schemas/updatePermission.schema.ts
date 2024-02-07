'use strict'


import { z } from 'zod'

import { idValidator } from '../shared.import'


export const updatePermissionSchema = z.object({
    body: z.object({
        canRead: z.boolean(),
        canWrite: z.boolean(),
        idSmCollaborator: idValidator,
        idAppSection: idValidator
    })
})


export type updatePermissionSchemaBodyType = z.infer<typeof updatePermissionSchema>['body']