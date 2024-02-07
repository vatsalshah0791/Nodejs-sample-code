'use strict'


import SmOdontogram from '../entities/SmOdontogram'


export interface UpdateGeneralOdontologyInterface {
    id: SmOdontogram['id']
    option: string
    title: string
    value: boolean
}