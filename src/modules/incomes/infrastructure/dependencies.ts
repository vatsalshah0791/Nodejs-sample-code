'use strict'


import {
    db,
    checkSelect,
    getObjectBase64,
    errorHandler,
} from './shared.import'

import IncomeClinicModel from './models/IncomeClinic.model'
import IncomeDoctorModel from './models/IncomeDoctor.model'
import IncomeTreatmentModel from './models/IncomeTreatment.model'

import ReadPercentagesClinicApplication from '../application/ReadPercentagesByClinic.application'
import ReadDayIncomesByClinicApplication from '../application/ReadDayIncomesByClinic.application'
import ReadWeekIncomesByClinicApplication from '../application/ReadWeekIncomesByClinic.application'
import ReadMonthIncomesByClinicApplication from '../application/ReadMonthIncomesByClinic.application'
import ReadYearIncomesByClinicApplication from '../application/ReadYearIncomesByClinic.application'
import ReadDayIncomesByDoctorApplication from '../application/ReadDayIncomesByDoctor.application'
import ReadWeekIncomesByDoctorApplication from '../application/ReadWeekIncomesByDoctor.application'
import ReadMonthIncomesByDoctorApplication from '../application/ReadMonthIncomesByDoctor.application'
import ReadYearIncomesByDoctorApplication from '../application/ReadYearIncomesByDoctor.application'
import ReadDayIncomesByTreatmentApplication from '../application/ReadDayIncomesByTreatment.application'
import ReadWeekIncomesByTreatmentApplication from '../application/ReadWeekIncomesByTreatment.application'
import ReadMonthIncomesByTreatmentApplication from '../application/ReadMonthIncomesByTreatment.application'
import ReadYearIncomesByTreatmentApplication from '../application/ReadYearIncomesByTreatment.application'

import ReadPercentagesClinicController from './controllers/ReadPercentagesClinic.controller'
import ReadDayIncomesByClinicController from './controllers/ReadDayIncomesByClinic.controller'
import ReadWeekIncomesByClinicController from './controllers/ReadWeekIncomesByClinic.controller'
import ReadMonthIncomesByClinicController from './controllers/ReadMonthIncomesByClinic.controller'
import ReadYearIncomesByClinicController from './controllers/ReadYearIncomesByClinic.controller'
import ReadDayIncomesByDoctorController from './controllers/ReadDayIncomesByDoctor.controller'
import ReadWeekIncomesByDoctorController from './controllers/ReadWeekIncomesByDoctor.controller'
import ReadMonthIncomesByDoctorController from './controllers/ReadMonthIncomesByDoctor.controller'
import ReadYearIncomesByDoctorController from './controllers/ReadYearIncomesByDoctor.controller'
import ReadDayIncomesByTreatmentController from './controllers/ReadDayIncomesByTreatment.controller'
import ReadWeekIncomesByTreatmentController from './controllers/ReadWeekIncomesByTreatment.controller'
import ReadMonthIncomesByTreatmentController from './controllers/ReadMonthIncomesByTreatment.controller'
import ReadYearIncomesByTreatmentController from './controllers/ReadYearIncomesByTreatment.controller'


const incomeClinicModel = new IncomeClinicModel(db, checkSelect)
const incomeDoctorModel = new IncomeDoctorModel(db)
const incomeTreatmentModel = new IncomeTreatmentModel(db)


const readPercentagesClinicApplication = new ReadPercentagesClinicApplication(incomeClinicModel)
const readDayIncomesByClinicApplication = new ReadDayIncomesByClinicApplication(incomeClinicModel, getObjectBase64)
const readWeekIncomesByClinicApplication = new ReadWeekIncomesByClinicApplication(incomeClinicModel)
const readMonthIncomesByClinicApplication = new ReadMonthIncomesByClinicApplication(incomeClinicModel)
const readYearIncomesByClinicApplication = new ReadYearIncomesByClinicApplication(incomeClinicModel)
const readDayIncomesByDoctorApplication = new ReadDayIncomesByDoctorApplication(incomeDoctorModel, getObjectBase64)
const readWeekIncomesByDoctorApplication = new ReadWeekIncomesByDoctorApplication(incomeDoctorModel, getObjectBase64)
const readMonthIncomesByDoctorApplication = new ReadMonthIncomesByDoctorApplication(incomeDoctorModel, getObjectBase64)
const readYearIncomesByDoctorApplication = new ReadYearIncomesByDoctorApplication(incomeDoctorModel, getObjectBase64)
const readDayIncomesByTreatmentApplication = new ReadDayIncomesByTreatmentApplication(incomeTreatmentModel)
const readWeekIncomesByTreatmentApplication = new ReadWeekIncomesByTreatmentApplication(incomeTreatmentModel)
const readMonthIncomesByTreatmentApplication = new ReadMonthIncomesByTreatmentApplication(incomeTreatmentModel)
const readYearIncomesByTreatmentApplication = new ReadYearIncomesByTreatmentApplication(incomeTreatmentModel)


export const readPercentagesClinicController = new ReadPercentagesClinicController(readPercentagesClinicApplication, errorHandler)
export const readDayIncomesByClinicController = new ReadDayIncomesByClinicController(readDayIncomesByClinicApplication, errorHandler)
export const readWeekIncomesByClinicController = new ReadWeekIncomesByClinicController(readWeekIncomesByClinicApplication, errorHandler)
export const readMonthIncomesByClinicController = new ReadMonthIncomesByClinicController(readMonthIncomesByClinicApplication, errorHandler)
export const readYearIncomesByClinicController = new ReadYearIncomesByClinicController(readYearIncomesByClinicApplication, errorHandler)
export const readDayIncomesByDoctorController = new ReadDayIncomesByDoctorController(readDayIncomesByDoctorApplication, errorHandler)
export const readWeekIncomesByDoctorController = new ReadWeekIncomesByDoctorController(readWeekIncomesByDoctorApplication, errorHandler)
export const readMonthIncomesByDoctorController = new ReadMonthIncomesByDoctorController(readMonthIncomesByDoctorApplication, errorHandler)
export const readYearIncomesByDoctorController = new ReadYearIncomesByDoctorController(readYearIncomesByDoctorApplication, errorHandler)
export const readDayIncomesByTreatmentController = new ReadDayIncomesByTreatmentController(readDayIncomesByTreatmentApplication, errorHandler)
export const readWeekIncomesByTreatmentController = new ReadWeekIncomesByTreatmentController(readWeekIncomesByTreatmentApplication, errorHandler)
export const readMonthIncomesByTreatmentController = new ReadMonthIncomesByTreatmentController(readMonthIncomesByTreatmentApplication, errorHandler)
export const readYearIncomesByTreatmentController = new ReadYearIncomesByTreatmentController(readYearIncomesByTreatmentApplication, errorHandler)