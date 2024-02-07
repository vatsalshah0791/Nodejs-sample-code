'use strict'


import { z } from 'zod'

import { idValidator } from '../shared.import'


export const readPhotosSchema = z.object({
    params: z.object({
        idPatient: idValidator
    })
})


export type readPhotosSchemaParamsType = z.infer<typeof readPhotosSchema>['params']