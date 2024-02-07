'use strict'


import { db, errorHandler } from './shared.import'

import CurrencyModel from './models/Currency.model'

import ReadCurrenciesApplication from '../application/ReadCurrencies.application'

import ReadCurrenciesController from './controllers/ReadCurrencies.controller'


const currencyModel = new CurrencyModel(db)


const readCurrenciesApplication = new ReadCurrenciesApplication(currencyModel)


export const readCurrenciesController = new ReadCurrenciesController(readCurrenciesApplication, errorHandler)