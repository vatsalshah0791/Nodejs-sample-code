'use strict'


import { z } from 'zod'

import { idValidator } from '../shared.import'


export const createPhotoSchema = z.object({
    body: z.object({
        idPatient: idValidator
    })
})


export type createPhotoSchemaBodyType = z.infer<typeof createPhotoSchema>['body']