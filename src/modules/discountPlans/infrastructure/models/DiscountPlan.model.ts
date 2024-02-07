'use strict'

import { QueryResult, Pool } from 'pg'

import DiscountPlanRepository from '../../domain/DiscountPlan.repository'

import { ReadDiscountPlansResultInterface } from '../../domain/DiscountPlan.interface'

export default class DiscountPlanModel implements DiscountPlanRepository {
    constructor(private readonly db: () => Pool) {}
    async readDiscountPlans(): Promise<ReadDiscountPlansResultInterface[]> {
        try {
            const selectAppDiscountPlanResult: QueryResult = await this.db().query(`
                SELECT id, discount_name, percentage_to_discount
                FROM app_discount_plan
                WHERE deleted_at IS NULL
            `)
            const discountPlans = selectAppDiscountPlanResult.rows.map(element => {
                const newElement: ReadDiscountPlansResultInterface = {
                    id: element.id,
                    discountName: element.discount_name,
                    percentageToDiscount: element.percentage_to_discount
                }
                return newElement
            })
            return discountPlans
        } catch (error) {
            console.error('ERROR -- MODEL: DiscountPlanModel.readDiscountPlans')
            throw error
        }
    }
}