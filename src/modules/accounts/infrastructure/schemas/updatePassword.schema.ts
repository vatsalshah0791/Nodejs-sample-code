'use strict'


import { z } from 'zod'


export const updatePasswordSchema = z.object({
    body: z.object({
        newPassword: z.string().max(25).min(8),
        confirmNewPassword: z.string().max(25).min(8),
        currentPassword: z.string().max(25).min(8)
    }).refine(data => data.newPassword === data.confirmNewPassword, { message: 'Passwords do not match' }),
})


export type updatePasswordSchemaBodyType = z.infer<typeof updatePasswordSchema>['body']