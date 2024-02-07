'use strict'


import { z } from 'zod'


export const loginSchema = z.object({
    body: z.object({
        username: z.string().max(25).min(5).trim(),
        password: z.string().max(25).min(8).trim()
    })
})


export type loginSchemaBodyType = z.infer<typeof loginSchema>['body']