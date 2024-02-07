'use strict'


import SmAtm from '../entities/SmAtm'


export interface UpdateAtmInterface {
    id: SmAtm['id']
    key: string
    option: String
    value: boolean
}