'use strict'


import {
    db,
    checkSelect,
    checkInsert,
    getObjectBase64,
    errorHandler
} from './shared.import'

import ExpenseFixedCostsModel from './models/ExpenseFixedCosts.model'
import VariableExpendsModel from './models/VariableExpends.model'

import CreateRentalExpenseApplication from '../application/CreateRentalExpense.application'
import CreateServiceExpenseApplication from '../application/CreateServiceExpense.application'
import CreateOtherExpenseApplication from '../application/CreateOtherExpense.application'
import ReadRentalExpensesApplication from '../application/ReadRentalExpenses.application'
import ReadWagesApplication from '../application/ReadWages.application'
import ReadServiceExpensesApplication from '../application/ReadServiceExpenses.application'
import ReadOtherExpensesApplication from '../application/ReadOtherExpenses.application'
import ReadFixedCostsByMonthApplication from '../application/ReadFixedCostsByMonth.application'
import UpdateRentalExpenseApplication from '../application/UpdateRentalExpense.application'
import UpdateServiceExpenseApplication from '../application/UpdateServiceExpense.application'
import UpdateOtherExpenseApplication from '../application/UpdateOtherExpense.application'
import DeleteRentalExpenseApplication from '../application/DeleteRentalExpense.application'
import DeleteServiceExpenseApplication from '../application/DeleteServiceExpense.application'
import DeleteOtherExpenseApplication from '../application/DeleteOtherExpense.application'
import ReadDayExpensesByProviderTypeApplication from '../application/ReadDayExpensesByProviderType.application'
import ReadWeekExpensesByProviderTypeApplication from '../application/ReadWeekExpensesByProviderType.application'
import ReadMonthExpensesByProviderTypeApplication from '../application/ReadMonthExpensesByProviderType.application'
import ReadYearExpensesByProviderTypeApplication from '../application/ReadYearExpensesByProviderType.application'
import ReadCommissionsByMonthApplication from '../application/ReadCommissionsByMonth.application'
import ReadCommissionsByYearApplication from '../application/ReadCommissionsByYear.application'
import ReadCommissionsByDoctorApplication from '../application/ReadCommissionsByDoctor.application'
import ReadMonthVariableExpendsApplication from '../application/ReadMonthVariableExpends.application'
import ReadYearVariableExpendsApplication from '../application/ReadYearVariableExpends.application'

import CreateRentalExpenseController from './controllers/CreateRentalExpense.controller'
import CreateServiceExpenseController from './controllers/CreateServiceExpense.controller'
import CreateOtherExpenseController from './controllers/CreateOtherExpense.controller'
import ReadRentalExpensesController from './controllers/ReadRentalExpenses.controller'
import ReadWagesController from './controllers/ReadWages.controller'
import ReadServiceExpensesController from './controllers/ReadServiceExpenses.controller'
import ReadOtherExpensesController from './controllers/ReadOtherExpenses.controller'
import ReadFixedCostsByMonthController from './controllers/ReadFixedCostsByMonth.controller'
import UpdateRentalExpenseController from './controllers/UpdateRentalExpense.controller'
import UpdateServiceExpenseController from './controllers/UpdateServiceExpense.controller'
import UpdateOtherExpenseController from './controllers/UpdateOtherExpense.controller'
import DeleteRentalExpenseController from './controllers/DeleteRentalExpense.controller'
import DeleteServiceExpenseController from './controllers/DeleteServiceExpense.controller'
import DeleteOtherExpenseController from './controllers/DeleteOtherExpense.controller'
import ReadDayExpensesByProviderTypeController from './controllers/ReadDayExpensesByProviderType.controller'
import ReadWeekExpensesByProviderTypeController from './controllers/ReadWeekExpensesByProviderType.controller'
import ReadMonthExpensesByProviderTypeController from './controllers/ReadMonthExpensesByProviderType.controller'
import ReadYearExpensesByProviderTypeController from './controllers/ReadYearExpensesByProviderType.controller'
import ReadCommissionsByMonthController from './controllers/readCommissionsByMonth.controller'
import ReadCommissionsByYearController from './controllers/readCommissionsByYear.controller'
import ReadCommissionsByDoctorController from './controllers/readCommissionsByDoctor.controller'
import ReadMonthVariableExpendsController from './controllers/ReadMonthVariableExpends.controller'
import ReadYearVariableExpendsController from './controllers/ReadYearVariableExpends.controller'


const expenseFixedCostsModel = new ExpenseFixedCostsModel(db, checkSelect, checkInsert)
const variableExpendsModel = new VariableExpendsModel(db, checkSelect)


const createRentalExpenseApplication = new CreateRentalExpenseApplication(expenseFixedCostsModel)
const createServiceExpenseApplication = new CreateServiceExpenseApplication(expenseFixedCostsModel)
const createOtherExpenseApplication = new CreateOtherExpenseApplication(expenseFixedCostsModel)
const readRentalExpensesApplication = new ReadRentalExpensesApplication(expenseFixedCostsModel)
const readWagesApplication = new ReadWagesApplication(expenseFixedCostsModel)
const readServiceExpensesApplication = new ReadServiceExpensesApplication(expenseFixedCostsModel)
const readOtherExpensesApplication = new ReadOtherExpensesApplication(expenseFixedCostsModel)
const readFixedCostsByMonthApplication = new ReadFixedCostsByMonthApplication(expenseFixedCostsModel)
const updateRentalExpenseApplication = new UpdateRentalExpenseApplication(expenseFixedCostsModel)
const updateServiceExpenseApplication = new UpdateServiceExpenseApplication(expenseFixedCostsModel)
const updateOtherExpenseApplication = new UpdateOtherExpenseApplication(expenseFixedCostsModel)
const deleteRentalExpenseApplication = new DeleteRentalExpenseApplication(expenseFixedCostsModel)
const deleteServiceExpenseApplication = new DeleteServiceExpenseApplication(expenseFixedCostsModel)
const deleteOtherExpenseApplication = new DeleteOtherExpenseApplication(expenseFixedCostsModel)
const readDayExpensesByProviderTypeApplication = new ReadDayExpensesByProviderTypeApplication(variableExpendsModel)
const readWeekExpensesByProviderTypeApplication = new ReadWeekExpensesByProviderTypeApplication(variableExpendsModel)
const readMonthExpensesByProviderTypeApplication = new ReadMonthExpensesByProviderTypeApplication(variableExpendsModel)
const readYearExpensesByProviderTypeApplication = new ReadYearExpensesByProviderTypeApplication(variableExpendsModel)
const readCommissionsByMonthApplication = new ReadCommissionsByMonthApplication(variableExpendsModel, getObjectBase64)
const readCommissionsByYearApplication = new ReadCommissionsByYearApplication(variableExpendsModel, getObjectBase64)
const readCommissionsByDoctorApplication = new ReadCommissionsByDoctorApplication(variableExpendsModel)
const readMonthVariableExpendsApplication = new ReadMonthVariableExpendsApplication(variableExpendsModel)
const readYearVariableExpendsApplication = new ReadYearVariableExpendsApplication(variableExpendsModel)


export const createRentalExpenseController = new CreateRentalExpenseController(createRentalExpenseApplication, errorHandler)
export const createServiceExpenseController = new CreateServiceExpenseController(createServiceExpenseApplication, errorHandler)
export const createOtherExpenseController = new CreateOtherExpenseController(createOtherExpenseApplication, errorHandler)
export const readRentalExpensesController = new ReadRentalExpensesController(readRentalExpensesApplication, errorHandler)
export const readWagesController = new ReadWagesController(readWagesApplication, errorHandler)
export const readServiceExpensesController = new ReadServiceExpensesController(readServiceExpensesApplication, errorHandler)
export const readOtherExpensesController = new ReadOtherExpensesController(readOtherExpensesApplication, errorHandler)
export const readFixedCostsByMonthController = new ReadFixedCostsByMonthController(readFixedCostsByMonthApplication, errorHandler)
export const updateRentalExpenseController = new UpdateRentalExpenseController(updateRentalExpenseApplication, errorHandler)
export const updateServiceExpenseController = new UpdateServiceExpenseController(updateServiceExpenseApplication, errorHandler)
export const updateOtherExpenseController = new UpdateOtherExpenseController(updateOtherExpenseApplication, errorHandler)
export const deleteRentalExpenseController = new DeleteRentalExpenseController(deleteRentalExpenseApplication, errorHandler)
export const deleteServiceExpenseController = new DeleteServiceExpenseController(deleteServiceExpenseApplication, errorHandler)
export const deleteOtherExpenseController = new DeleteOtherExpenseController(deleteOtherExpenseApplication, errorHandler)
export const readDayExpensesByProviderTypeController = new ReadDayExpensesByProviderTypeController(readDayExpensesByProviderTypeApplication, errorHandler)
export const readWeekExpensesByProviderTypeController = new ReadWeekExpensesByProviderTypeController(readWeekExpensesByProviderTypeApplication, errorHandler)
export const readMonthExpensesByProviderTypeController = new ReadMonthExpensesByProviderTypeController(readMonthExpensesByProviderTypeApplication, errorHandler)
export const readYearExpensesByProviderTypeController = new ReadYearExpensesByProviderTypeController(readYearExpensesByProviderTypeApplication, errorHandler)
export const readCommissionsByMonthController = new ReadCommissionsByMonthController(readCommissionsByMonthApplication, errorHandler)
export const readCommissionsByYearController = new ReadCommissionsByYearController(readCommissionsByYearApplication, errorHandler)
export const readCommissionsByDoctorController = new ReadCommissionsByDoctorController(readCommissionsByDoctorApplication, errorHandler)
export const readMonthVariableExpendsController = new ReadMonthVariableExpendsController(readMonthVariableExpendsApplication, errorHandler)
export const readYearVariableExpendsController = new ReadYearVariableExpendsController(readYearVariableExpendsApplication, errorHandler)