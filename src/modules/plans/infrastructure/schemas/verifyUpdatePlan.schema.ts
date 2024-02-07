'use strict'


import { z } from 'zod'

import { idValidator } from '../shared.import'


export const verifyUpdatePlanSchema = z.object({
    body: z.object({
        idPlan: idValidator
    })
})


export type verifyUpdatePlanSchemaBodyTypes = z.infer<typeof verifyUpdatePlanSchema>['body']