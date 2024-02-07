'use strict'


import SmOdontogram from '../entities/SmOdontogram'


export interface UpdateProsthesisMultilineInterface {
    id: SmOdontogram['id']
    option: string
    title: string
    value: boolean
}