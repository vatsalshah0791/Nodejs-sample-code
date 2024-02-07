'use strict'


import SmEndodontics from '../entities/SmEndodontics'


export interface ReadEndodonticsInterface {
    idSmPatient: SmEndodontics['idSmPatient']
}

export interface ReadEndodonticsResultInterface {
    success: boolean
    id?: SmEndodontics['id']
    examNotes?: SmEndodontics['examNotes']
}