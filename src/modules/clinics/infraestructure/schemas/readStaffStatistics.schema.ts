'use strict'


import { z } from 'zod'

import idValidator from '../../../shared/validators/id.validator'


export const readStaffStatisticsSchema = z.object({
    params: z.object({
        id: idValidator
    })
})

export type readStaffStatisticsSchemaParamsType = z.infer<typeof readStaffStatisticsSchema>['params']