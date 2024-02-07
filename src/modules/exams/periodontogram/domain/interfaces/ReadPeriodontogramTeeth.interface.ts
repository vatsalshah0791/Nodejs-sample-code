'use strict'


import SmPeriodontogram from '../entities/SmPeriodontogram'


export interface ReadPeriodontogramTeethInterface {
    idSmPatient: SmPeriodontogram['idSmPatient']
    teeth: SmPeriodontogram['teeth']
}

export interface ReadPeriodontogramTeethResultInterface {
    success: boolean
    id?: SmPeriodontogram['id']
    questions?: SmPeriodontogram['questions']
    mobility?: SmPeriodontogram['mobility']
    furcationInjury?: SmPeriodontogram['furcationInjury']
    gingivalMargin?: SmPeriodontogram['gingivalMargin']
    periodontalPocket?: SmPeriodontogram['periodontalPocket']
}