'use strict'


import { ReadLanguagesResultInterface } from './interface/ReadLanguages.interface'


export default interface LanguageRepository {

    readLanguages(): Promise<ReadLanguagesResultInterface[]>

}