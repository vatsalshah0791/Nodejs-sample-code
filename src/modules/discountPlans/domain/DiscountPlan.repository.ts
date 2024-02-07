'use strict'

import { ReadDiscountPlansResultInterface } from './DiscountPlan.interface'

export default interface DiscountPlanRepository {

    readDiscountPlans(): Promise<ReadDiscountPlansResultInterface[]>

}