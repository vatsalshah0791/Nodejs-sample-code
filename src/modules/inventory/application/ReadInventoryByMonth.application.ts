'use strict'

import InventoryRepository from '../domain/Inventory.repository'

import {
    ReadInventoryMonthInterface,
    ReadInventoryMonthResultInterface
} from '../domain/Inventory.interface'

interface DTO {
    success: boolean
    statusCode: number
    message: string
    language: { refresh: boolean }
    data?: Omit<ReadInventoryMonthResultInterface, 'success'>
}

export default class ReadInventoryByMonthApplication {
    constructor(private readonly inventoryRepository: InventoryRepository) {}
    async run(data: ReadInventoryMonthInterface): Promise<DTO> {
        try {
            const readInventoryMonthResult = await this.inventoryRepository.readInventoryMonth(data)
            if(!readInventoryMonthResult.success) {
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
                    total: readInventoryMonthResult.total,
                    currency: readInventoryMonthResult.currency
                }
            }
            return response
        } catch (error) {
            console.error('ERROR -- LOGIC: inventory => application => ReadInventoryByMonthApplication.run')
            throw error
        }
    }
}