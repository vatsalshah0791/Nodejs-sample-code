'use strict'


import AppLanguage from '../entities/AppLanguage'


export interface ReadLanguagesResultInterface {
    id: AppLanguage['id']
    languageName: AppLanguage['languageName']
}