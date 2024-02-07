'use strict'

import { db, formatDate, errorHandler } from './shared.import'

import BillModel from './models/Bill.model'

import CreateBillApplication from '../application/CreateBill.application'
import ReadBillByDateApplication from '../application/ReadBillByDate.application'
import ReadBillApplication from '../application/ReadBill.application'

import CreateBillController from './controllers/CreateBill.controller'
import ReadBillByDateController from './controllers/ReadBillByDate.controller'
import ReadBillController from './controllers/ReadBill.controller'

const billModel = new BillModel(db, formatDate)

const createBillApplication = new CreateBillApplication(billModel)
const readBillByDateApplication = new ReadBillByDateApplication(billModel)
const readBillApplication = new ReadBillApplication(billModel)

export const createBillController = new CreateBillController(createBillApplication, errorHandler)
export const readBillByDateController = new ReadBillByDateController(readBillByDateApplication, errorHandler)
export const readBillController = new ReadBillController(readBillApplication, errorHandler)