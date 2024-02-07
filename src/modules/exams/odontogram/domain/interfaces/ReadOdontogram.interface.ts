'use strict'


import SmOdontogram from '../entities/SmOdontogram'


export interface ReadOdontogramInterface {
    idSmPatient: SmOdontogram['idSmPatient']
}

export interface ReadOdontogramResultInterface {
    id: SmOdontogram['id']
    teeth: SmOdontogram['teeth']
    questions: SmOdontogram['questions']
    generalOdontology: SmOdontogram['generalOdontology']
    prosthesis: SmOdontogram['prosthesis']
    endodontics: SmOdontogram['endodontics']
    orthodontics: SmOdontogram['orthodontics']
}