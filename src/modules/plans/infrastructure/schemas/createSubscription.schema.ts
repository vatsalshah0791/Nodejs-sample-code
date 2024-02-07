'use strict'


import { z } from 'zod'

import { idValidator } from '../shared.import'


export const createSubscriptionSchema = z.object({
    body: z.object({
        idPlan: idValidator,
        deviceFingerprint: z.string().max(30).min(10)
    })
})


export type createSubscriptionSchemaBodyTypes = z.infer<typeof createSubscriptionSchema>['body']