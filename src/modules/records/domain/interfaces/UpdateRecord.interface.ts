'use strict'


import SmRecord from '../entities/SmRecord'


export interface UpdateRecordInterface {
    id: SmRecord['id']
    key: string
    option: string
    value: boolean
}