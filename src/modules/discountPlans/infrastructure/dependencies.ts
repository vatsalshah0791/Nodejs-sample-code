'use strict'

import {
    db,
    errorHandler
} from './shared.import'

import DiscountPlanModel from './models/DiscountPlan.model'

import ReadDiscountPlansApplication from '../application/ReadDiscountPlans.application'

import ReadDiscountPlansControllers from './controllers/ReadDiscountPlansControllers'

const discountPlanModel = new DiscountPlanModel(db)

const readDiscountPlansApplication = new ReadDiscountPlansApplication(discountPlanModel)

export const readDiscountPlansControllers = new ReadDiscountPlansControllers(readDiscountPlansApplication, errorHandler)