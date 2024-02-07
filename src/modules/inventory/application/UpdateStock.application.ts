'use strict'

import InventoryRepository from '../domain/Inventory.repository'

import { UpdateStockInterface } from '../domain/Inventory.interface'

interface DTO {
    success: boolean
    statusCode: number
    message: string
    language: { refresh: boolean }
}

export default class UpdateStockApplication {
    constructor(private readonly inventoryRepository: InventoryRepository) {}
    async run(data: UpdateStockInterface): Promise<DTO> {
        try {
            const updateStockResult = await this.inventoryRepository.updateStock(data)
            if(!updateStockResult) {
                const response: DTO = {
                    success: true,
                    statusCode: 400,
                    message: 'The product does not exist',
                    language: { refresh: false }
                }
                return response
            }
            const response: DTO = {
                success: true,
                statusCode: 200,
                message: 'Success',
                language: { refresh: false }
            }
            return response
        } catch (error) {
            console.error('ERROR -- LOGIC: inventory => application => UpdateStockApplication.run')
            throw error
        }
    }
}