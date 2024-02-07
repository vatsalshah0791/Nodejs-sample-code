'use strict'


import { z } from 'zod'

import { idValidator } from '../shared.import'


export const updateBacterialplaqueSchema = z.object({
    body: z.object({
        option: z.string().max(5).min(1).trim(),
        teeth: z.object({
            primaryTooth: z.boolean(),
            absent: z.boolean(),
            mesial: z.boolean(),
            lingual: z.boolean(),
            distal: z.boolean(),
            bucal: z.boolean(),
            oclusal: z.boolean()
        })
    }),
    params: z.object({
        id: idValidator,
        key: z.string().max(35).min(2).trim()
    })
})


export type updateBacterialplaqueSchemaBodyType = z.infer<typeof updateBacterialplaqueSchema>['body']
export type updateBacterialplaqueSchemaParamsType = z.infer<typeof updateBacterialplaqueSchema>['params']