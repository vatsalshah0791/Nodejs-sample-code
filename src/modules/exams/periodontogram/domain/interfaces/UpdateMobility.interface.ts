'use strict'


import SmPeriodontogram from '../entities/SmPeriodontogram'


export interface UpdateMobilityInterface {
    id: SmPeriodontogram['id']
    option: string
    value: boolean
}