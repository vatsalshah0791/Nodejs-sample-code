'use strict'


import { z } from 'zod'

import { idValidator } from '../shared.import'


export const readPatientsSchema = z.object({
    params: z.object({
        idClinic: idValidator
    })
})


export type readPatientsSchemaParamsType = z.infer<typeof readPatientsSchema>['params']