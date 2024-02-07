'use strict'


import { z } from 'zod'

import { idValidator } from '../shared.import'


export const updateClinicalExaminationSchema = z.object({
    body: z.object({
        option: z.string().max(30).min(2).trim(),
        value: z.boolean()
    }),
    params: z.object({
        id: idValidator
    })
})


export type updateClinicalExaminationSchemaBodyType = z.infer<typeof updateClinicalExaminationSchema>['body']
export type updateClinicalExaminationSchemaParamsType = z.infer<typeof updateClinicalExaminationSchema>['params']