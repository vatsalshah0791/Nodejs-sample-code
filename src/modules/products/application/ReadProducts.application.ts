'use strict'


import ProductRepository from '../domain/Product.repository'

import { ReadProductsInterface, ReadProductsResultInterface } from '../domain/interfaces/ReadProducts.interface'


interface Result {
    success: boolean
    statusCode: number
    message: string
    data?: ReadProductsResultInterface[]
}


export default class ReadProductsApplication {
    constructor(private readonly productRepository: ProductRepository) {}
    async run(data: ReadProductsInterface): Promise<Result> {
        const readProductsResult = await this.productRepository.readProducts(data)
        const response: Result = {
            success: true,
            statusCode: 200,
            message: 'Success',
            data: readProductsResult
        }
        return response
    }
}