'use strict'


import ProductRepository from '../domain/Product.repository'

import { DeleteProductInterface } from '../domain/interfaces/DeleteProduct.interface'


interface Result {
    success: boolean
    statusCode: number
    message: string
}


export default class DeleteProductApplication {
    constructor(private readonly productRepository: ProductRepository) {}
    async run(data: DeleteProductInterface): Promise<Result> {
        const deleteProducResult = await this.productRepository.deleteProduct(data)
        if(!deleteProducResult) {
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