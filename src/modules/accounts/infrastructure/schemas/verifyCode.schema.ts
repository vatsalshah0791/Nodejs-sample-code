'use strict'


import { z } from 'zod'

import { idValidator } from '../shared.import'


export const verifyCodeSchema = z.object({
    body: z.object({
        idAccount: idValidator,
        code: z.string().uuid()
    })
})


export type verifyCodeSchemaBodyType = z.infer<typeof verifyCodeSchema>['body']