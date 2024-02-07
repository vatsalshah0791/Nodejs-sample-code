'use strict'


import { z } from 'zod'

import { idValidator } from '../shared.import'


export const deletePhotoSchema = z.object({
    params: z.object({
        id: idValidator
    })
})


export type deletePhotoSchemaParamsType = z.infer<typeof deletePhotoSchema>['params']