'use strict'


import { QueryResult, Pool } from 'pg'

import ProductRepository from '../../domain/Product.repository'

import { CheckPlanInterface } from '../../domain/interfaces/CheckPlan.interface'
import { CreateProductInterface, CreateProductResultInterface } from '../../domain/interfaces/CreateProduct.interface'
import { ReadProductsInterface, ReadProductsResultInterface } from '../../domain/interfaces/ReadProducts.interface'
import { UpdateProductInterface } from '../../domain/interfaces/UpdateProduct.interface'
import { DeleteProductInterface } from '../../domain/interfaces/DeleteProduct.interface'

import checkPlanTransactions from './transactions/checkPlan.transactions'
import createProductQuery from './querys/createProduct.query'
import readProductsQuery from './querys/readProducts.query'
import updateProductQuery from './querys/updateProduct.query'
import deleteProductsQuery from './querys/deleteProducts.query'


export default class ProductModel implements ProductRepository {
    constructor(
        private readonly db: () => Pool,
        private readonly checkSelect: (param: QueryResult) => boolean,
        private readonly checkInsert: (param: QueryResult) => boolean
    ) {}
    async checkPlan(data: CheckPlanInterface): Promise<boolean> {
        try {
            const [selectAppPlan, selectCountProducts] = checkPlanTransactions
            const values = [data.idClinic]
            const selectAppPlanResult: QueryResult = await this.db().query(selectAppPlan, values)
            if(!this.checkSelect(selectAppPlanResult)) {
                return false
            }
            const selectCountProductsResult: QueryResult = await this.db().query(selectCountProducts, values)
            const availableProducts = selectAppPlanResult.rows[0].patients
            const productsCreated = selectCountProductsResult.rows[0].total_products
            if(availableProducts === -1) {
                return true
            }
            if(productsCreated >= availableProducts) {
                return false
            }
            return true
        } catch (error) {
            console.error('ERROR -- MODEL: ProductModel.checkPlan')
            throw error
        }
    }
    async createProduct(data: CreateProductInterface): Promise<CreateProductResultInterface> {
        try {
            const values = [
                data.productName,
                data.idSmClinic
            ]
            const createProductQueryResult: QueryResult = await this.db().query(createProductQuery, values)
            if(this.checkInsert(createProductQueryResult)) {
                const modelResult: CreateProductResultInterface = {
                    success: true,
                    id: createProductQueryResult.rows[0].id
                }
                return modelResult
            }
            const modelResult: CreateProductResultInterface = { success: false }
            return modelResult
        } catch (error) {
            console.error('ERROR -- MODEL: ProductModel.createProduct')
            throw error
        }
    }
    async readProducts(data: ReadProductsInterface): Promise<ReadProductsResultInterface[]> {
        try {
            const values = [data.idClinic]
            const readProductsQueryResult: QueryResult = await this.db().query(readProductsQuery, values)
            const products = readProductsQueryResult.rows.map(element => {
                const newElement: ReadProductsResultInterface = {
                    id: element.id,
                    productName: element.product_name
                }
                return newElement
            })
            return products
        } catch (error) {
            console.error('ERROR -- MODEL: ProductModel.readProducts')
            throw error
        }
    }
    async updateProduct(data: UpdateProductInterface): Promise<boolean> {
        try {
            const values = [
                data.productName,
                data.id
            ]
            const updateProductQueryResult: QueryResult = await this.db().query(updateProductQuery, values)
            return this.checkInsert(updateProductQueryResult)
        } catch (error) {
            console.error('ERROR -- MODEL: ProductModel.updateProduct')
            throw error
        }
    }
    async deleteProduct(data: DeleteProductInterface): Promise<boolean> {
        try {
            const values = [data.id]
            const deleteProductsQueryResult: QueryResult = await this.db().query(deleteProductsQuery, values)
            return this.checkInsert(deleteProductsQueryResult)
        } catch (error) {
            console.error('ERROR -- MODEL: ProductModel.deleteProduct')
            throw error
        }
    }
}