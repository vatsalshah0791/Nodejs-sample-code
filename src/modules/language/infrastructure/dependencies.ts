'use strict'


import { db, errorHandler } from './shared.import'

import LanguageModel from './models/Languages.model'

import ReadLanguagesApplication from '../application/ReadLanguages.application'

import ReadLanguagesController from './controllers/ReadLanguages.controller'


const languageModel = new LanguageModel(db)


const readLanguagesApplication = new ReadLanguagesApplication(languageModel)


export const readLanguagesController = new ReadLanguagesController(readLanguagesApplication, errorHandler)