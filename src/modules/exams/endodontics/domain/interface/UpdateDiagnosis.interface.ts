'use strict'


import SmEndodonticsTeeth from '../entities/SmEndodonticsTeeth'


export interface UpdateDiagnosisInterface {
    id: SmEndodonticsTeeth['id']
    option: string
    value: boolean
}