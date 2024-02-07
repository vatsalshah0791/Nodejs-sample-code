'use strict'


import { QueryResult, Pool } from 'pg'

import LanguageRepository from '../../domain/Language.repository'

import { ReadLanguagesResultInterface } from '../../domain/interface/ReadLanguages.interface'

import readLanguagesQuery from './querys/readLanguages.query'


export default class LanguageModel implements LanguageRepository {
    constructor(private readonly db: () => Pool) {}
    async readLanguages(): Promise<ReadLanguagesResultInterface[]> {
        try {
            const readLanguagesQueryResult: QueryResult = await this.db().query(readLanguagesQuery)
            const languages = readLanguagesQueryResult.rows.map(element => {
                const newElement: ReadLanguagesResultInterface = {
                    id: element.id,
                    languageName: element.language_name
                }
                return newElement
            })
            return languages
        } catch (error) {
            console.error('ERROR -- MODEL: LanguageModel.readLanguages')
            throw error
        }
    }
}