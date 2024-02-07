'use strict'


import { z } from 'zod'

import { idValidator } from '../shared.import'


export const updateGingivalMarginSchema = z.object({
    body: z.object({
        mesial: z.number(),
        central: z.number(),
        distal: z.number()
    }),
    params: z.object({
        id: idValidator
    })
})


export type updateGingivalMarginSchemaBodyType = z.infer<typeof updateGingivalMarginSchema>['body']
export type updateGingivalMarginSchemaParamsType = z.infer<typeof updateGingivalMarginSchema>['params']