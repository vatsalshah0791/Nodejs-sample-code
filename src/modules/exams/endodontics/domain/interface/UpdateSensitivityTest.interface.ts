'use strict'


import SmEndodonticsTeeth from '../entities/SmEndodonticsTeeth'


export interface UpdateSensitivityTestInterface {
    id: SmEndodonticsTeeth['id']
    option: string
    value: boolean
}