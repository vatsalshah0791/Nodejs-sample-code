'use strict'


import SmAtm from '../entities/SmAtm'


export interface UpdateAtmMultilineInterface {
    id: SmAtm['id']
    key: string
    option: string
    title: string
    value: boolean
}