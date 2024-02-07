'use strict'


import SmBacterialPlaque from '../entities/SmBacterialPlaque'


export interface ReadBacterialPlaqueInterface {
    idSmPatient: SmBacterialPlaque['idSmPatient']
}

export interface ReadBacterialPlaqueResultInterface {
    success: boolean
    id?: SmBacterialPlaque['id']
    isAdult?: SmBacterialPlaque['isAdult']
    rightUpperQuadrant?: SmBacterialPlaque['rightUpperQuadrant']
    upperLeftQuadrant?: SmBacterialPlaque['upperLeftQuadrant']
    rightLowerQuadrant?: SmBacterialPlaque['rightLowerQuadrant']
    lowerLeftQuadrant?: SmBacterialPlaque['lowerLeftQuadrant']
}