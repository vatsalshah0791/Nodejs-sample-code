'use strict'

import AppDiscountPlan from './entities/AppDiscountPlan'

export interface ReadDiscountPlansResultInterface {
    id: AppDiscountPlan['id']
    discountName: AppDiscountPlan['discountName']
    percentageToDiscount: AppDiscountPlan['percentageToDiscount']
}