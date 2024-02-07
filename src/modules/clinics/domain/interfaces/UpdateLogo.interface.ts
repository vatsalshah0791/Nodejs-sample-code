'use strict'


import SmClinic from '../entities/SmClinic'


export interface UpdateLogoInterface {
    id: SmClinic['id']
    logo: SmClinic['logo']
}