'use strict'


import SmPeriodontogram from '../entities/SmPeriodontogram'


export interface UpdateGingivalMarginInterface {
    id: SmPeriodontogram['id']
    mesial: number
    central: number
    distal: number
}