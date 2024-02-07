'use strict'


import SmEndodonticsTeeth from '../entities/SmEndodonticsTeeth'


export interface UpdateClinicalExaminationMultilineInterface {
    id: SmEndodonticsTeeth['id']
    option: string
    title: string
    value: boolean
}