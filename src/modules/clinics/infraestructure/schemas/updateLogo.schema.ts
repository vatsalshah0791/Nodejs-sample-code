'use strict'


import { z } from 'zod'

import { idValidator } from '../shared.import'


export const updateLogoSchema = z.object({
    params: z.object({
        id: idValidator
    })
})

export type UpdateLogoSchemaParamsType = z.infer<typeof updateLogoSchema>['params']