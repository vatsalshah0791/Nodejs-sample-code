'use strict'


import SmClinic from '../entities/SmClinic'


export interface ReadLogoKeyInterface {
    id: SmClinic['id']
}

export interface ReadLogoKeyResultInterface {
    success: boolean
    logo?: SmClinic['logo']
}