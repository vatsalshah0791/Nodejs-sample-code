'use strict'


import { z } from 'zod'


export const updateUsernameSchema = z.object({
    body: z.object({
        newUsername: z.string().max(25).min(5).trim()
    })
})


export type updateUsernameSchemaBodyType = z.infer<typeof updateUsernameSchema>['body']