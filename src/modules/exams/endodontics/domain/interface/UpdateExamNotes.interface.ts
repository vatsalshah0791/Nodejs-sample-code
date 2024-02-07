'use strict'


import SmEndodontics from '../entities/SmEndodontics'


export interface UpdateExamNotesInterface {
    id: SmEndodontics['id']
    note: SmEndodontics['examNotes']
}