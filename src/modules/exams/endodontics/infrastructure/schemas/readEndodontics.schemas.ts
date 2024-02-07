'use strict'


import { z } from 'zod'

import { idValidator } from '../shared.import'


export const readEndodonticsSchema = z.object({
    params: z.object({
        idPatient: idValidator
    })
})


export type readEndodonticsSchemaParamsType = z.infer<typeof readEndodonticsSchema>['params']