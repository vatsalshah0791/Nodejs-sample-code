'use strict'


import { z } from 'zod'

import { idValidator } from '../shared.import'


export const resetPasswordSchema = z.object({
    body: z.object({
        idAccount: idValidator,
        code: z.string().uuid(),
        newPassword: z.string().max(25).min(8),
        confirmNewPassword: z.string().max(25).min(8)
    }).refine(data => data.newPassword === data.confirmNewPassword, { message: 'Passwords do not match' })
})


export type resetPasswordSchemaBodyType = z.infer<typeof resetPasswordSchema>['body']