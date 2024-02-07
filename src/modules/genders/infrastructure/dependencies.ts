'use strict'


import { db, errorHandler } from './shared.import'

import GenderModel from './models/Gender.model'

import ReadGendersApplication from '../application/ReadGenders.application'

import ReadGendersController from './controllers/ReadGenders.controllers'


const genderModel = new GenderModel(db)


const readGendersApplication = new ReadGendersApplication(genderModel)


export const readGendersController = new ReadGendersController(readGendersApplication, errorHandler)