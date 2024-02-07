'use strict'

import { QueryResult, PoolClient, Pool } from 'pg'

import BillRepository from '../../domain/Bill.repository'

import {
    CreateBillInterface,
    CreateBillResultInterface,
    ReadByDateInterface,
    ReadByDateResultInterface,
    ReadBillInterface,
    ReadBillResultInterface
} from '../../domain/Bill.interface'

export default class BillModel implements BillRepository {
    constructor(
        private readonly db: () => Pool,
        private readonly formatDate: (param: string) => string
    ) {}
    async createBill(data: CreateBillInterface): Promise<CreateBillResultInterface> {
        let client: PoolClient = await this.db().connect()
        try {
            await client.query('BEGIN')
            const insertSmBillResult: QueryResult = await client.query(`
                INSERT INTO sm_bill (
                    no_bill,
                    date_bill,
                    id_sm_provider,
                    id_sm_clinic
                ) VALUES ($1, $2, $3, $4)
                RETURNING id
            `, [data.no, data.date, data.idProvider, data.idClinic])
            const idBill = insertSmBillResult.rows[0].id
            for(const item of data.items) {
                await client.query(`
                    INSERT INTO sm_bill_item (
                        amount,
                        unit_price,
                        id_sm_product,
                        id_sm_bill
                    ) VALUES ($1, $2, $3, $4)
                `, [item.amount, item.unitPrice, item.idProduct, idBill])
                const verifyStock: QueryResult = await client.query(`
                    SELECT id
                    FROM sm_stock
                    WHERE id_sm_product=$1
                    AND unit_price=$2
                    AND id_sm_clinic=$3
                    AND deleted_at IS NULL
                `, [item.idProduct, item.unitPrice, data.idClinic])
                if(verifyStock.rows.length > 0) {
                    await client.query(`
                        UPDATE sm_stock
                        SET stock=stock+$1
                        WHERE id=$2
                    `, [item.amount, verifyStock.rows[0].id])
                }
                else {
                    await client.query(`
                        INSERT INTO sm_stock (
                            stock,
                            unit_price,
                            id_sm_product,
                            id_sm_clinic
                        ) VALUES ($1, $2, $3, $4)
                    `, [item.amount, item.unitPrice, item.idProduct, data.idClinic])
                }
            }
            await client.query('COMMIT')
            const modelResult: CreateBillResultInterface = {
                success: true,
                id: idBill
            }
            return modelResult
        } catch (error) {
            await client.query('ROLLBACK')
            console.error('ERROR -- MODEL: BillModel.createBill')
            throw error
        }
        finally {
            client.release()
        }
    }
    async readByDate(data: ReadByDateInterface): Promise<ReadByDateResultInterface[]> {
        try {
            const selectSmBillResult: QueryResult = await this.db().query(`
                SELECT
                	sm_bill.id,
                	sm_bill.no_bill,
                    ${this.formatDate('sm_bill.date_bill')} as as_date_bill,
                	sm_provider.title,
                	COALESCE(SUM(sm_bill_item.amount * sm_bill_item.unit_price), 0) AS total,
					app_currency.currency_symbol
                FROM sm_bill
                INNER JOIN sm_provider ON sm_provider.id=sm_bill.id_sm_provider
                INNER JOIN sm_clinic ON sm_clinic.id=sm_bill.id_sm_clinic
				INNER JOIN app_currency ON app_currency.id=sm_clinic.id_app_currency
                LEFT JOIN sm_bill_item ON sm_bill_item.id_sm_bill=sm_bill.id
                WHERE EXTRACT(MONTH FROM sm_bill.date_bill)=$1
                AND EXTRACT(YEAR FROM sm_bill.date_bill)=$2
                AND sm_bill.id_sm_clinic=$3
                AND sm_bill.deleted_at IS NULL
                GROUP BY
                	sm_bill.id,
                	sm_provider.title,
					app_currency.currency_symbol
            `, [data.month, data.year, data.idClinic])
            const bills = selectSmBillResult.rows.map(element => {
                const newElement: ReadByDateResultInterface = {
                    id: element.id,
                    no: element.no_bill,
                    date: element.as_date_bill,
                    provider: element.title,
                    total: element.total,
                    currency: element.currency_symbol
                }
                return newElement
            })
            return bills
        } catch (error) {
            console.error('ERROR -- MODEL: BillModel.readByDate')
            throw error
        }
    }
    async readBill(data: ReadBillInterface): Promise<ReadBillResultInterface> {
        try {
            const selectSmBillResult: QueryResult = await this.db().query(`
                SELECT
                	sm_bill.id,
                	sm_bill.no_bill,
                    ${this.formatDate('sm_bill.date_bill')} as as_date_bill,
                	sm_provider.title,
					app_currency.currency_symbol
                FROM sm_bill
                INNER JOIN sm_provider ON sm_provider.id=sm_bill.id_sm_provider
                INNER JOIN sm_clinic ON sm_clinic.id=sm_bill.id_sm_clinic
				INNER JOIN app_currency ON app_currency.id=sm_clinic.id_app_currency
                WHERE sm_bill.id=$1
                AND sm_bill.deleted_at IS NULL
            `, [data.id])
            if(selectSmBillResult.rows.length === 0){
                const modelResult: ReadBillResultInterface = { success: false }
                return modelResult
            }
            const bill = selectSmBillResult.rows[0]
            const selectSmBillItem: QueryResult = await this.db().query(`
                SELECT
                    sm_bill_item.id,
                    sm_bill_item.amount,
                    sm_bill_item.unit_price,
                    sm_product.product_name
                FROM sm_bill_item
                INNER JOIN sm_product ON sm_product.id=sm_bill_item.id_sm_product
                WHERE sm_bill_item.id_sm_bill=$1
                AND sm_bill_item.deleted_at IS NULL
            `, [bill.id])
            const billitems = selectSmBillItem.rows.map(element => {
                const newElement = {
                    id: element.id,
                    amount: element.amount,
                    unitPrice: element.unit_price,
                    product: element.product_name
                }
                return newElement
            })
            const modelResult: ReadBillResultInterface = {
                success: true,
                id: bill.id,
                no: bill.no_bill,
                date: bill.as_date_bill,
                provider: bill.title,
                currency: bill.currency_symbol,
                items: billitems
            }
            return modelResult
        } catch (error) {
            console.error('ERROR -- MODEL: BillModel.readBill')
            throw error
        }
    }
}