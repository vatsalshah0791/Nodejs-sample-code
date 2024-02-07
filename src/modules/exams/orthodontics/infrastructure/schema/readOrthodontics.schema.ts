'use strict'


import { z } from 'zod'

import { idValidator } from '../shared.import'


export const readOrthodonticsSchema = z.object({
    params: z.object({
        idPatient: idValidator
    })
})


export type readOrthodonticsSchemaParamsType = z.infer<typeof readOrthodonticsSchema>['params']