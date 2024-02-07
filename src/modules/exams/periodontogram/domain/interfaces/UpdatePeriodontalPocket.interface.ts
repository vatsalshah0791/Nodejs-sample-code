'use strict'


import SmPeriodontogram from '../entities/SmPeriodontogram'


export interface UpdatePeriodontalPocketInterface {
    id: SmPeriodontogram['id']
    mesial: number
    central: number
    distal: number
}