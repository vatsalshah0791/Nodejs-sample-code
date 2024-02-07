'use strict'


import { z } from 'zod'

import { idValidator } from '../shared.import'


export const updatePhotoSchema = z.object({
    params: z.object({
        id: idValidator
    })
})


export type updatePhotoSchemaParamsType = z.infer<typeof updatePhotoSchema>['params']