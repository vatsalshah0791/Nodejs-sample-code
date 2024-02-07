'use strict'

import { QueryResult, Pool } from 'pg'

import InventoryRepository from '../../domain/Inventory.repository'

import {
    ReadInventoryMonthInterface,
    ReadInventoryMonthResultInterface,
    ReadInventoryYearInterface,
    ReadInventoryYearResultInterface,
    ReadInventoryInterface,
    ReadInventoryResultInterface,
    UpdateStockInterface
} from '../../domain/Inventory.interface'

export default class InventoryModel implements InventoryRepository {
    constructor(
        private readonly db: () => Pool,
        private readonly checkDataAffected: (param: QueryResult) => boolean
    ) {}
    async readInventoryMonth(data: ReadInventoryMonthInterface): Promise<ReadInventoryMonthResultInterface> {
        try {
            const selectSmBill: QueryResult = await this.db().query(`
                SELECT
                    COALESCE(SUM(sm_bill_item.amount * sm_bill_item.unit_price), 0) AS as_total,
                    app_currency.currency_symbol
                FROM sm_bill
                INNER JOIN sm_clinic ON sm_clinic.id=sm_bill.id_sm_clinic
                INNER JOIN app_currency ON app_currency.id=sm_clinic.id_app_currency
                LEFT JOIN sm_bill_item ON sm_bill_item.id_sm_bill=sm_bill.id
                AND EXTRACT(MONTH FROM sm_bill.date_bill)=$1
                AND EXTRACT(YEAR FROM sm_bill.date_bill)=$2
                AND sm_bill.id_sm_clinic=$3
                AND sm_bill.deleted_at IS NULL
                GROUP BY
                    app_currency.currency_symbol
            `, [data.month, data.year, data.idClinic])
            if(selectSmBill.rows.length > 0) {
                const bill = selectSmBill.rows[0]
                const modelResult: ReadInventoryMonthResultInterface = {
                    success: true,
                    total: bill.as_total,
                    currency: bill.currency_symbol
                }
                return modelResult
            }
            const modelResult: ReadInventoryMonthResultInterface = { success: false }
            return modelResult
        } catch (error) {
            console.error('ERROR -- MODEL: InventoryModel.readInventoryMonth')
            throw error
        }
    }
    async readInventoryYear(data: ReadInventoryYearInterface): Promise<ReadInventoryYearResultInterface> {
        try {
            const selectSmBill: QueryResult = await this.db().query(`
                SELECT
                    COALESCE(SUM(sm_bill_item.amount * sm_bill_item.unit_price), 0) AS as_total,
                    app_currency.currency_symbol
                FROM sm_bill
                INNER JOIN sm_clinic ON sm_clinic.id=sm_bill.id_sm_clinic
                INNER JOIN app_currency ON app_currency.id=sm_clinic.id_app_currency
                LEFT JOIN sm_bill_item ON sm_bill_item.id_sm_bill=sm_bill.id
                AND EXTRACT(YEAR FROM sm_bill.date_bill)=$1
                AND sm_bill.id_sm_clinic=$2
                AND sm_bill.deleted_at IS NULL
                GROUP BY
                    app_currency.currency_symbol
            `, [data.year, data.idClinic])
            if(selectSmBill.rows.length > 0) {
                const bill = selectSmBill.rows[0]
                const currentYear = new Date().getFullYear()
                const currentMonth = new Date().getMonth() + 1
                const modelResult: ReadInventoryYearResultInterface = {
                    success: true,
                    total: bill.as_total,
                    monthlyAverage: data.year === currentYear ? bill.as_total / currentMonth : bill.as_total / 12,
                    currency: bill.currency_symbol
                }
                return modelResult
            }
            const modelResult: ReadInventoryYearResultInterface = { success: false }
            return modelResult
        } catch (error) {
            console.error('ERROR -- MODEL: InventoryModel.readInventoryYear')
            throw error
        }
    }
    async readInventory(data: ReadInventoryInterface): Promise<ReadInventoryResultInterface[]> {
        try {
            const selectSmStockResult: QueryResult = await this.db().query(`
                SELECT
                    sm_stock.id,
                    stock,
                    unit_price,
                    product_name,
                    (stock * unit_price) AS as_total,
                    currency_symbol
                FROM sm_stock
                INNER JOIN sm_product ON sm_product.id=sm_stock.id_sm_product
                INNER JOIN sm_clinic ON sm_clinic.id=sm_stock.id_sm_clinic
                INNER JOIN app_currency ON app_currency.id=sm_clinic.id_app_currency
                WHERE sm_stock.id_sm_clinic=$1
                AND sm_stock.deleted_at IS NULL
            `, [data.idClinic])
            const inventory = selectSmStockResult.rows.map(element => {
                const newElement: ReadInventoryResultInterface = {
                    id: element.id,
                    stock: element.stock,
                    unitPrice: element.unit_price,
                    product: element.product_name,
                    total: element.as_total,
                    currency: element.currency_symbol
                }
                return newElement
            })
            return inventory
        } catch (error) {
            console.error('ERROR -- MODEL: InventoryModel.readInventory')
            throw error
        }
    }
    async updateStock(data: UpdateStockInterface): Promise<boolean> {
        try {
            const updateSmStockResult: QueryResult = await this.db().query(`
                UPDATE sm_stock
                SET stock=stock-$1
                WHERE id=$2
            `, [data.subtrahend, data.id])
            return this.checkDataAffected(updateSmStockResult)
        } catch (error) {
            console.error('ERROR -- MODEL: InventoryModel.updateStock')
            throw error
        }
    }
}