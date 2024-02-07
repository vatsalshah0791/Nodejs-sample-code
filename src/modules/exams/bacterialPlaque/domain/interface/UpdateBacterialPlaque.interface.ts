'use strict'


import SmBacterialPlaque from '../entities/SmBacterialPlaque'


export interface UpdateBacterialPlaqueInterface {
    id: SmBacterialPlaque['id']
    key: string
    option: string
    teeth: {
        primaryTooth: boolean
        absent: boolean
        mesial: boolean
        lingual: boolean
        distal: boolean
        bucal: boolean
        oclusal: boolean
    }
}