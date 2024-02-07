'use strict'


import SmEndodonticsTeeth from '../entities/SmEndodonticsTeeth'


export interface UpdateDuctsInterface {
    id: SmEndodonticsTeeth['id']
    option: string
    length: string
    instrumentation: string
}