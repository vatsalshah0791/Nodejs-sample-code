'use strict'


import SmEndodonticsTeeth from '../entities/SmEndodonticsTeeth'


export interface UpdateClinicalExaminationInterface {
    id: SmEndodonticsTeeth['id']
    option: string
    value: boolean
}