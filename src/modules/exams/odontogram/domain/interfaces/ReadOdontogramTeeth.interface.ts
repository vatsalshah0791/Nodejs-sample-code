'use strict'


import SmOdontogram from '../entities/SmOdontogram'


export interface ReadOdontogramTeethInterface {
    idSmPatient: SmOdontogram['idSmPatient']
    teeth: SmOdontogram['teeth']
}

export interface ReadOdontogramTeethResultInterface {
    success: boolean
    id?: SmOdontogram['id']
    questions?: SmOdontogram['questions']
    generalOdontology?: SmOdontogram['generalOdontology']
    prosthesis?: SmOdontogram['prosthesis']
    endodontics?: SmOdontogram['endodontics']
    orthodontics?: SmOdontogram['orthodontics']
}