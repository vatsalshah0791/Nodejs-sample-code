'use strict'


import { z } from 'zod'

import { idValidator } from '../shared.import'


export const readAtmSchema = z.object({
    params: z.object({
        idPatient: idValidator
    })
})


export type readAtmSchemaParamsType = z.infer<typeof readAtmSchema>['params']