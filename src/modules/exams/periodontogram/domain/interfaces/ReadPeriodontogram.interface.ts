'use strict'


import SmPeriodontogram from '../entities/SmPeriodontogram'


export interface ReadPeriodontogramInterface {
    idSmPatient: SmPeriodontogram['idSmPatient']
}

export interface ReadPeriodontogramResultInterface {
    id: SmPeriodontogram['id']
    teeth: SmPeriodontogram['teeth']
    questions: SmPeriodontogram['questions']
    mobility: SmPeriodontogram['mobility']
    furcationInjury: SmPeriodontogram['furcationInjury']
    gingivalMargin: SmPeriodontogram['gingivalMargin']
    periodontalPocket: SmPeriodontogram['periodontalPocket']
}