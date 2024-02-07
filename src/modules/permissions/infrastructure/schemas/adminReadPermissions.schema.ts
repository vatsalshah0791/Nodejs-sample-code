'use strict'


import { z } from 'zod'

import { idValidator } from '../shared.import'


export const adminReadPermissionsSchema = z.object({
    params: z.object({
        id: idValidator
    })
})


export type adminReadPermissionsSchemaParamsType = z.infer<typeof adminReadPermissionsSchema>['params']