'use strict'


import { db, errorHandler } from './shared.import'

import CountryModel from './models/Country.model'

import ReadCountriesApplication from '../application/ReadCountries.application'

import ReadCountriesController from './controllers/ReadCountries.controllers'


const countryModel = new CountryModel(db)


const readCountriesApplication = new ReadCountriesApplication(countryModel)


export const readCountriesController = new ReadCountriesController(readCountriesApplication, errorHandler)