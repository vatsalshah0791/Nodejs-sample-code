'use strict'


import ProductRepository from '../domain/Product.repository'

import { UpdateProductInterface } from '../domain/interfaces/UpdateProduct.interface'


interface Result {
    success: boolean
    statusCode: number
    message: string
}


export default class UpdateProductApplication {
    constructor(private readonly productRepository: ProductRepository) {}
    async run(data: UpdateProductInterface): Promise<Result> {
        const updateProductResult = await this.productRepository.updateProduct(data)
        if(!updateProductResult) {
            const response: Result = {
                success: false,
                statusCode: 400,
                message: 'The product does not exist'
            }
            return response
        }
        const response: Result = {
            success: true,
            statusCode: 200,
            message: 'Success'
        }
        return response
    }
}