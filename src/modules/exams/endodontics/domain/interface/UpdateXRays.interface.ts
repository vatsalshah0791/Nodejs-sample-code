'use strict'


import SmEndodonticsTeeth from '../entities/SmEndodonticsTeeth'


export interface UpdateXRaysInterface {
    id: SmEndodonticsTeeth['id']
    option: string
    title: string
    value: boolean
}