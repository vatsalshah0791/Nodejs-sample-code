'use strict'


import { z } from 'zod'

import { idValidator } from '../shared.import'


export const updateLanguageSchema = z.object({
    body: z.object({
        idLanguage: idValidator
    })
})


export type updateLanguageSchemaSchemaBodyType = z.infer<typeof updateLanguageSchema>['body']