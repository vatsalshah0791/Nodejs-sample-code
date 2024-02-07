'use strict'


import { z } from 'zod'

import { idValidator } from '../shared.import'


export const deleteProviderSchema = z.object({
    params: z.object({
        id: idValidator
    })
})


export type deleteProviderSchemaParamsType = z.infer<typeof deleteProviderSchema>['params']