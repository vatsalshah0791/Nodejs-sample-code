'use strict'


import LanguageRepository from '../domain/Language.repository'

import { ReadLanguagesResultInterface } from '../domain/interface/ReadLanguages.interface'


interface Result {
    success: boolean
    statusCode: number
    message: string
    data?: ReadLanguagesResultInterface[]
}


export default class ReadLanguagesApplication {
    constructor(private readonly languageRepository: LanguageRepository) {}
    async run(): Promise<Result> {
        const readLanguagesResult = await this.languageRepository.readLanguages()
        const response: Result = {
            success: true,
            statusCode: 200,
            message: 'Success',
            data: readLanguagesResult
        }
        return response
    }
}