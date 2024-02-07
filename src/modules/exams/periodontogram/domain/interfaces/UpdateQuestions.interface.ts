'use strict'


import SmPeriodontogram from '../entities/SmPeriodontogram'


export interface UpdateQuestionsInterface {
    id: SmPeriodontogram['id']
    option: string
    title: string
    value: boolean
}