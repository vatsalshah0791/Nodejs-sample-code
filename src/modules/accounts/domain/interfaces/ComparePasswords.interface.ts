'use strict'


import SmAccount from '../entities/SmAccount'


export interface ComparePasswordsInterface {
    hash: SmAccount['realPassword']
    text: string
}