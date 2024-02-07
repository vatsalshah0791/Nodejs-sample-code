'use strict'


import { z } from 'zod'

import { idValidator } from '../shared.import'


export const updateClinicalExaminationMultilineSchema = z.object({
    body: z.object({
        option: z.string().max(30).min(2).trim(),
        title: z.string().max(30).min(2).trim(),
        value: z.boolean()
    }),
    params: z.object({
        id: idValidator
    })
})


export type updateClinicalExaminationMultilineSchemaBodyType = z.infer<typeof updateClinicalExaminationMultilineSchema>['body']
export type updateClinicalExaminationMultilineSchemaParamsType = z.infer<typeof updateClinicalExaminationMultilineSchema>['params']