'use strict'


import { db, errorHandler } from './shared.import'

import TimeZoneModel from './models/TimeZone.model'

import ReadTimeZonesApplication from '../application/ReadTimeZones.application'

import ReadTimeZonesController from './controllers/ReadTimeZones.controller'


const timeZoneModel = new TimeZoneModel(db)


const readTimeZonesApplication = new ReadTimeZonesApplication(timeZoneModel)


export const readTimeZonesController = new ReadTimeZonesController(readTimeZonesApplication, errorHandler)