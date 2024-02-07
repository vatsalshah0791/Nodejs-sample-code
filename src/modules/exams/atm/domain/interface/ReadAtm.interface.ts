'use strict'


import SmAtm from '../entities/SmAtm'


export interface ReadAtmInterface {
    idSmPatient: SmAtm['idSmPatient']
}

export interface ReadAtmResultInterface {
    success: boolean
    id?: SmAtm['id']
    examNotes?: SmAtm['examNotes']
    questions?:  SmAtm['questions']
    snap?: SmAtm['snap']
    crepitation?: SmAtm['crepitation']
    pain?: SmAtm['pain']
    opening?: SmAtm['opening']
    closing?: SmAtm['closing']
    treatment?: SmAtm['treatment']
}