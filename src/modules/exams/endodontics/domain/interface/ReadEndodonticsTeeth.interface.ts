'use strict'


import SmEndodonticsTeeth from '../entities/SmEndodonticsTeeth'


export interface ReadEndodonticsTeethInterface {
    idSmPatient: SmEndodonticsTeeth['idSmPatient']
    teeth: SmEndodonticsTeeth['teeth']
}

export interface ReadEndodonticsTeethResultInterface {
    success: boolean
    id?: SmEndodonticsTeeth['id']
    pain?: SmEndodonticsTeeth['pain']
    clinicalExamination?: SmEndodonticsTeeth['clinicalExamination']
    xRays?: SmEndodonticsTeeth['xRays']
    sensitivityTest?: SmEndodonticsTeeth['sensitivityTest']
    diagnosis?: SmEndodonticsTeeth['diagnosis']
    ducts?: SmEndodonticsTeeth['ducts']
}