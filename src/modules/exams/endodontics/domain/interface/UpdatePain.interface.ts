'use strict'


import SmEndodonticsTeeth from '../entities/SmEndodonticsTeeth'


export interface UpdatePainInterface {
    id: SmEndodonticsTeeth['id']
    option: string
    title: string
    value: boolean
}