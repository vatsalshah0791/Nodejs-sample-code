'use strict'


import ProductRepository from '../domain/Product.repository'

import { CreateProductInterface } from '../domain/interfaces/CreateProduct.interface'


interface Result {
    success: boolean
    statusCode: number
    message: string
    data?: { id?: string }
}


export default class CreateProductApplication {
    constructor(private readonly productRepository: ProductRepository) {}
    async run(data: CreateProductInterface): Promise<Result> {
        const checkPlanResult = await this.productRepository.checkPlan({ idClinic: data.idSmClinic })
        if(!checkPlanResult) {
            const response: Result = {
                success: false,
                statusCode: 402,
                message: 'Product limit reached'
            }
            return response
        }
        const createProductResult = await this.productRepository.createProduct(data)
        if(!createProductResult.success) {
            const response: Result = {
                success: false,
                statusCode: 500,
                message: 'Error creating the product'
            }
            return response
        }
        const response: Result = {
            success: true,
            statusCode: 201,
            message: 'Success',
            data: { id: createProductResult.id }
        }
        return response
    }
}