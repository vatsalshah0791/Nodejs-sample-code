'use strict'


import SmAccount from '../entities/SmAccount'


export interface UpdateLanguageInterface {
    idAccount: SmAccount['id']
    idAppLanguage: SmAccount['idAppLanguage']
}