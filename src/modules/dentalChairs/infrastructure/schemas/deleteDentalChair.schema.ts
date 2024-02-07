'use strict'


import { z } from 'zod'

import { idValidator } from '../shared.import'


export const deleteDentalChairSchema = z.object({
    params: z.object({
        id: idValidator
    })
})


export type deleteDentalChairSchemaParamsType = z.infer<typeof deleteDentalChairSchema>['params']