'use strict'


import { z } from 'zod'

import { idValidator } from '../shared.import'


export const readReadBactrialPlaqueSchema = z.object({
    params: z.object({
        idPatient: idValidator
    })
})


export type readReadBactrialPlaqueSchemaParamsType = z.infer<typeof readReadBactrialPlaqueSchema>['params']