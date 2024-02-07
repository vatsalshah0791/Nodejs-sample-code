'use strict'


import { z } from 'zod'


export const verifyAccountSchema = z.object({
    body: z.object({
        verificationCode: z.string().uuid()
    })
})


export type verifyAccountSchemaBodyType = z.infer<typeof verifyAccountSchema>['body']