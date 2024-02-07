'use strict'


import SmAtm from '../entities/SmAtm'


export interface UpdateExamNotesInterface {
    id: SmAtm['id']
    note: SmAtm['examNotes']
}