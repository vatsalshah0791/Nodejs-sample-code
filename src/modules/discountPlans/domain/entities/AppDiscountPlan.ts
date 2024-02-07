'use strict'

export default interface AppDiscountPlan {
    id: string
    discountName: string
    percentageToDiscount: number
    createdAt: Date
    updatedAt: Date
    deletedAt: Date | null
}