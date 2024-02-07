'use strict'


import { db, errorHandler, checkSelect, checkInsert } from './shared.import'

import PlanModel from './models/Plan.model'

import ReadPlansApplication from '../application/ReadPlans.application'
import ReadPlansByAdminApplication from '../application/ReadPlansByAdmin.applications'
import ReadCustomerApplication from '../application/ReadCustomer.application'
import UpdateIdCustomerApplication from '../application/UpdateIdCustomer.application'
import ReadPlanApplication from '../application/ReadPlan.application'
import ReadSubscriptionApplication from '../application/ReadSubscription.application'
import UpdateSubscriptionApplication from '../application/UpdateSubscription.application'
import VerifyPlanExpirationDateAdminApplication from '../application/VerifyPlanExpirationDateAdmin.application'
import VerifyPlanExpirationDateCollaboratorApplication from '../application/VerifyPlanExpirationDateCollaborator.application'

import ReadPlansControllers from './controllers/ReadPlans.controller'
import ReadPlansByAdminController from './controllers/ReadPlansByAdmin.controller'
import CreateCustomerController from './controllers/CreateCustomer.controller'
import ReadPaymentsIntrumentByCustomerController from './controllers/ReadPaymentsIntrumentByCustomer.controller'
import CreateCustomerPaymentInstrumentController from './controllers/CreateCustomerPaymentInstrument.controller'
import UpdateCustomerPaymentInstrumentController from './controllers/UpdateCustomerPaymentInstrument.controller'
import DeleteCustomerPaymentInstrumentController from './controllers/DeleteCustomerPaymentInstrument.controller'
import VerifyUpdatePlanController from './controllers/verifyUpdatePlan.controller'
import CreateSubscriptionController from './controllers/CreateSubscription.controlle'
import VerifyPlanExpirationDateAdminController from './controllers/VerifyPlanExpirationDateAdmin.controller'
import VerifyPlanExpirationDateCollaboratorController from './controllers/VerifyPlanExpirationDateCollaborator.controller'


const planModel = new PlanModel(db, checkSelect, checkInsert)


const readPlansApplication = new ReadPlansApplication(planModel)
const readPlansByAdminApplication = new ReadPlansByAdminApplication(planModel)
const readCustomerApplication = new ReadCustomerApplication(planModel)
const updateIdCustomerApplication = new UpdateIdCustomerApplication(planModel)
const readPlanApplication = new ReadPlanApplication(planModel)
const readSubscriptionApplication = new ReadSubscriptionApplication(planModel)
const updateSubscriptionApplication = new UpdateSubscriptionApplication(planModel)
const verifyPlanExpirationDateAdminApplication = new VerifyPlanExpirationDateAdminApplication(planModel)
const verifyPlanExpirationDateCollaboratorApplication = new VerifyPlanExpirationDateCollaboratorApplication(planModel)


export const readPlansControllers = new ReadPlansControllers(readPlansApplication, errorHandler)
export const readPlansByAdminController = new ReadPlansByAdminController(readPlansByAdminApplication, errorHandler)
export const createCustomerController = new CreateCustomerController(readCustomerApplication, updateIdCustomerApplication, errorHandler)
export const readPaymentsIntrumentByCustomerController = new ReadPaymentsIntrumentByCustomerController(readCustomerApplication, errorHandler)
export const createCustomerPaymentInstrumentController = new CreateCustomerPaymentInstrumentController(readCustomerApplication, errorHandler)
export const updateCustomerPaymentInstrumentController = new UpdateCustomerPaymentInstrumentController(readCustomerApplication, errorHandler)
export const deleteCustomerPaymentInstrumentController = new DeleteCustomerPaymentInstrumentController(readCustomerApplication, errorHandler)
export const verifyUpdatePlanController = new VerifyUpdatePlanController(readPlanApplication, readSubscriptionApplication, errorHandler)
export const createSubscriptionController = new CreateSubscriptionController(readPlanApplication, readSubscriptionApplication, updateSubscriptionApplication, errorHandler)
export const verifyPlanExpirationDateAdminController = new VerifyPlanExpirationDateAdminController(verifyPlanExpirationDateAdminApplication, errorHandler)
export const verifyPlanExpirationDateCollaboratorController = new VerifyPlanExpirationDateCollaboratorController(verifyPlanExpirationDateCollaboratorApplication, errorHandler)