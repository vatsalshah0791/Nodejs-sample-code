'use strict'


import SmRecord from '../entities/SmRecord'


export interface UpdateDentalHistoryNotesInterface {
    id: SmRecord['id']
    note: SmRecord['dentalHistoryNotes']
}