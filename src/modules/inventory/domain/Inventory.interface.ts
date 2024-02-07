'use strict'

import SmStock from './entities/SmStock'

export interface ReadInventoryMonthInterface {
    idClinic: SmStock['idSmClinic']
    month: number
    year: number
}
export interface ReadInventoryMonthResultInterface {
    success: boolean
    total?: number
    currency?: string
}

export interface ReadInventoryYearInterface {
    idClinic: SmStock['idSmClinic']
    year: number
}
export interface ReadInventoryYearResultInterface {
    success: boolean
    total?: number
    currency?: number
    monthlyAverage?: number
}

export interface ReadInventoryInterface { idClinic: SmStock['idSmClinic'] }
export interface ReadInventoryResultInterface {
    id: SmStock['id']
    stock: SmStock['stock']
    unitPrice: SmStock['unitPrice']
    product: string
    total: number
    currency: string
}

export interface UpdateStockInterface {
    id: string
    subtrahend: number
}