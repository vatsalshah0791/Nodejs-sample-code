'use strict'


import SmBacterialPlaque from '../entities/SmBacterialPlaque'


export interface UpdateIsAdultInterface {
    id: SmBacterialPlaque['id']
    isAdult: SmBacterialPlaque['isAdult']
}