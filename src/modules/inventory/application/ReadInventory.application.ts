'use strict'

import InventoryRepository from '../domain/Inventory.repository'

import {
    ReadInventoryInterface,
    ReadInventoryResultInterface
} from '../domain/Inventory.interface'

interface DTO {
    success: boolean
    statusCode: number
    message: string
    language: { refresh: boolean }
    data?: ReadInventoryResultInterface[]
}

export default class ReadInventoryApplication {
    constructor(private readonly inventoryRepository: InventoryRepository) {}
    async run(data: ReadInventoryInterface): Promise<DTO> {
        try {
            const readInventarioResult = await this.inventoryRepository.readInventory(data)
            const response: DTO = {
                success: true,
                statusCode: 200,
                message: 'Success',
                language: { refresh: false },
                data: readInventarioResult
            }
            return response
        } catch (error) {
            console.error('ERROR -- LOGIC: inventory => application => ReadInventoryApplication.run')
            throw error
        }
    }
}