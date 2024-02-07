'use strict'

import BillRepository from '../domain/Bill.repository'

import { CreateBillInterface } from '../domain/Bill.interface'

interface DTO {
    success: boolean
    statusCode: number
    message: string
    language: { refresh: boolean }
    data?: { id?: string }
}

export default class CreateBillApplication {
    constructor(private readonly billRepository: BillRepository) {}
    async run(data: CreateBillInterface): Promise<DTO> {
        try {
            const createBillResult = await this.billRepository.createBill(data)
            if(!createBillResult.success) {
                const response: DTO = {
                    success: false,
                    statusCode: 500,
                    message: 'Error creating invoice',
                    language: { refresh: false }
                }
                return response
            }
            const response: DTO = {
                success: true,
                statusCode: 201,
                message: 'Success',
                language: { refresh: false },
                data: { id: createBillResult.id }
            }
            return response
        } catch (error) {
            console.error('ERROR -- LOGIC: bills => application => CreateBillApplication.run')
            throw error
        }
    }
}