'use strict'


import SmOrthodontics from '../entities/SmOrthodontics'


export interface ReadOrthodonticsInterface {
    idSmPatient: SmOrthodontics['idSmPatient']
}

export interface ReadOrthodonticsResultInterface {
    success: boolean
    id?: SmOrthodontics['id']
    examNotes?: SmOrthodontics['examNotes']
    softTissue?: SmOrthodontics['softTissue']
    dentalExam?: SmOrthodontics['dentalExam']
}