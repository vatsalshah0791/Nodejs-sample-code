'use strict'


import SmRecord from '../entities/SmRecord'


export interface UpdateMedicalHistoryNotesInterface {
    id: SmRecord['id']
    note: SmRecord['medicalHistoryNotes']
}