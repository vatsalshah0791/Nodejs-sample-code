'use strict'


import SmOrthodontics from '../entities/SmOrthodontics'


export interface UpdateOrthodonticsInterface {
    id: SmOrthodontics['id']
    key: string
    option: string
    title: string
    value: boolean
}