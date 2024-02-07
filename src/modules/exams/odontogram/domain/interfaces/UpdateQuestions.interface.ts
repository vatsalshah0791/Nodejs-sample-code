'use strict'


import SmOdontogram from '../entities/SmOdontogram'


export interface UpdateQuestionsInterface {
    id: SmOdontogram['id']
    option: string
    value: boolean
}