'use strict'


import { z } from 'zod'


export const generatePasswordResetCodeSchema = z.object({
    body: z.object({
        username: z.string().max(25).min(5).trim()
    })
})


export type generatePasswordResetCodeSchemaBodyType = z.infer<typeof generatePasswordResetCodeSchema>['body']