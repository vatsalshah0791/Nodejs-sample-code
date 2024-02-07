'use strict'


import SmOrthodontics from '../entities/SmOrthodontics'


export interface UpdateExamNotesInterface {
    id: SmOrthodontics['id']
    note: SmOrthodontics['examNotes']
}