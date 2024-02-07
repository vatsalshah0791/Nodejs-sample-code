'use strict'


import SmOdontogram from '../entities/SmOdontogram'


export interface UpdateProsthesisInterface {
    id: SmOdontogram['id']
    option: string
    value: boolean
}