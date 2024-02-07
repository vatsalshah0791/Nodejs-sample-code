'use strict'

import {
    db,
    checkDataAffected,
    errorHandler
} from './shared.import'

import InventoryModel from './models/Inventory.model'

import ReadInventoryByMonthApplication from '../application/ReadInventoryByMonth.application'
import ReadInventoryByYearApplication from '../application/ReadInventoryByYear.application'
import ReadInventoryApplication from '../application/ReadInventory.application'
import UpdateStockApplication from '../application/UpdateStock.application'

import ReadInventoryByMonthController from './controllers/ReadInventoryByMonth.controller'
import ReadInventoryByYearController from './controllers/ReadInventoryByYear.controller'
import ReadInventoryController from './controllers/ReadInventory.controller'
import UpdateStockController from './controllers/UpdateStock.controller'

const inventoryModel = new InventoryModel(db, checkDataAffected)

const readInventoryByMonthApplication = new ReadInventoryByMonthApplication(inventoryModel)
const readInventoryByYearApplication = new ReadInventoryByYearApplication(inventoryModel)
const readInventoryApplication = new ReadInventoryApplication(inventoryModel)
const updateStockApplication = new UpdateStockApplication(inventoryModel)

export const readInventoryByMonthController = new ReadInventoryByMonthController(readInventoryByMonthApplication, errorHandler)
export const readInventoryByYearController = new ReadInventoryByYearController(readInventoryByYearApplication, errorHandler)
export const readInventoryController = new ReadInventoryController(readInventoryApplication, errorHandler)
export const updateStockController = new UpdateStockController(updateStockApplication, errorHandler)