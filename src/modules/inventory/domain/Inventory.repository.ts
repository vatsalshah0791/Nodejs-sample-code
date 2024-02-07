'use strict'

import {
    ReadInventoryMonthInterface,
    ReadInventoryMonthResultInterface,
    ReadInventoryYearInterface,
    ReadInventoryYearResultInterface,
    ReadInventoryInterface,
    ReadInventoryResultInterface,
    UpdateStockInterface
} from './Inventory.interface'

export default interface InventoryRepository {

    readInventoryMonth(data: ReadInventoryMonthInterface): Promise<ReadInventoryMonthResultInterface>

    readInventoryYear(data: ReadInventoryYearInterface): Promise<ReadInventoryYearResultInterface>

    readInventory(data: ReadInventoryInterface): Promise<ReadInventoryResultInterface[]>

    updateStock(data: UpdateStockInterface): Promise<boolean>
}