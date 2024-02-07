'use strict'


import SmRecord from '../entities/SmRecord'


export interface ReadRecordInterface {
    idSmPatient: SmRecord['idSmPatient']
}

export interface ReadRecordResultInterface {
    success: boolean
    id?: SmRecord['id']
    medicalHistoryNotes?: SmRecord['medicalHistoryNotes']
    dentalHistoryNotes?: SmRecord['dentalHistoryNotes']
    allergies?: SmRecord['allergies']
    heartProblems?: SmRecord['heartProblems']
    medicalRecord?: SmRecord['medicalRecord']
    sensitivity?: SmRecord['sensitivity']
    oralExam?: SmRecord['oralExam']
    ailments?: SmRecord['ailments']
}