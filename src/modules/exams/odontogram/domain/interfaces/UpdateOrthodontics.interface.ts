'use strict'


import SmOdontogram from '../entities/SmOdontogram'


export interface UpdateOrthodonticsInterface {
    id: SmOdontogram['id']
    option: string
    value: boolean
}