'use strict'

import DiscountPlanRepository from '../domain/DiscountPlan.repository'

import { ReadDiscountPlansResultInterface } from '../domain/DiscountPlan.interface'

interface DTO {
    success: boolean
    statusCode: number
    message: string
    language: {
        refresh: boolean
        language?: string
    }
    data?: ReadDiscountPlansResultInterface[]
}

export default class ReadDiscountPlansApplication {
    constructor(private readonly discountPlanRepository: DiscountPlanRepository) {}
    async run(): Promise<DTO> {
        try {
            const readDiscountPlansResult = await this.discountPlanRepository.readDiscountPlans()
            const response: DTO = {
                success: true,
                statusCode: 200,
                message: 'Success',
                language: { refresh: false },
                data: readDiscountPlansResult
            }
            return response
        } catch (error) {
            console.error('ERROR -- LOGIC: discountPlans => application => ReadDiscountPlansApplication.run')
            throw error
        }
    }
}