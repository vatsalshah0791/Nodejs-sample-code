'use strict'


import {
    db,
    checkSelect,
    checkInsert,
    errorHandler
} from './shared.import'

import BacterialPlaqueModel from './models/BacterialPlaque.model'

import ReadBacterialPlaqueApplication from '../application/ReadBacterialPlaque.application'
import UpdateIsAdultApplication from '../application/UpdateIsAdult.application'
import UpdateBacterialPlaqueApplication from '../application/UpdateBacterialPlaque.application'

import ReadBacterialPlaqueController from './controllers/ReadBacterialPlaque.controller'
import UpdateIsAdultController from './controllers/UpdateIsAdult.controller'
import UpdateBacterialPlaqueController from './controllers/UpdateBacterialPlaque.controller'


const bacterialPlaque = new BacterialPlaqueModel(db, checkSelect, checkInsert)


const readBacterialPlaqueApplication = new ReadBacterialPlaqueApplication(bacterialPlaque)
const updateIsAdultApplication = new UpdateIsAdultApplication(bacterialPlaque)
const updateBacterialPlaqueApplication = new UpdateBacterialPlaqueApplication(bacterialPlaque)


export const readBacterialPlaqueController = new ReadBacterialPlaqueController(readBacterialPlaqueApplication, errorHandler)
export const updateIsAdultController = new UpdateIsAdultController(updateIsAdultApplication, errorHandler)
export const updateBacterialPlaqueController = new UpdateBacterialPlaqueController(updateBacterialPlaqueApplication, errorHandler)