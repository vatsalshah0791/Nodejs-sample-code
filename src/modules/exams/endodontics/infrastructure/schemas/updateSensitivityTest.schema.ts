'use strict'


import { z } from 'zod'

import { idValidator } from '../shared.import'


export const updateSensitivityTestSchema = z.object({
    body: z.object({
        option: z.string().max(30).min(2).trim(),
        value: z.boolean()
    }),
    params: z.object({
        id: idValidator
    })
})


export type updateSensitivityTestSchemaBodyType = z.infer<typeof updateSensitivityTestSchema>['body']
export type updateSensitivityTestSchemaParamsType = z.infer<typeof updateSensitivityTestSchema>['params']