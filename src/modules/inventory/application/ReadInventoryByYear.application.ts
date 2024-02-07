'use strict'

import InventoryRepository from '../domain/Inventory.repository'

import {
    ReadInventoryYearInterface,
    ReadInventoryYearResultInterface
} from '../domain/Inventory.interface'

interface DTO {
    success: boolean
    statusCode: number
    message: string
    language: { refresh: boolean }
    data?: Omit<ReadInventoryYearResultInterface, 'success'>
}

export default class ReadInventoryByYearApplication {
    constructor(private readonly inventoryRepository: InventoryRepository) {}
    async run(data: ReadInventoryYearInterface): Promise<DTO> {
        try {
            const readInventoryYearResult = await this.inventoryRepository.readInventoryYear(data)
            if(!readInventoryYearResult.success) {
                const response: DTO = {
                    success: false,
                    statusCode: 400,
                    message: 'Impossible to calculate inventory',
                    language: { refresh: false }
                }
                return response
            }
            const response: DTO = {
                success: true,
                statusCode: 200,
                message: 'Success',
                language: { refresh: false },
                data: {
                    total: readInventoryYearResult.total,
                    currency: readInventoryYearResult.currency,
                    monthlyAverage: readInventoryYearResult.monthlyAverage
                }
            }
            return response
        } catch (error) {
            console.error('ERROR -- LOGIC: inventory => application => ReadInventoryByYearApplication.run')
            throw error
        }
    }
}