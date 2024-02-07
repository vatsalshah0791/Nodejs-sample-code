'use strict'


import SmOdontogram from '../entities/SmOdontogram'


export interface UpdateEndodonticsInterface {
    id: SmOdontogram['id']
    option: string
    value: boolean
}