'use strict'


import { z } from 'zod'

import idValidator from '../../../shared/validators/id.validator'


export const readClinicSchema = z.object({
    params: z.object({
        id: idValidator
    })
})

export type readClinicSchemaParamsType = z.infer<typeof readClinicSchema>['params']