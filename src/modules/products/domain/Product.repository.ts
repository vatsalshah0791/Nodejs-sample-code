'use strict'


import { CheckPlanInterface } from './interfaces/CheckPlan.interface'
import { CreateProductInterface, CreateProductResultInterface } from './interfaces/CreateProduct.interface'
import { ReadProductsInterface, ReadProductsResultInterface } from './interfaces/ReadProducts.interface'
import { UpdateProductInterface } from './interfaces/UpdateProduct.interface'
import { DeleteProductInterface } from './interfaces/DeleteProduct.interface'


export default interface ProductRepository {

    checkPlan(data: CheckPlanInterface): Promise<boolean>

    createProduct(data: CreateProductInterface): Promise<CreateProductResultInterface>

    readProducts(data: ReadProductsInterface): Promise<ReadProductsResultInterface[]>

    updateProduct(data: UpdateProductInterface): Promise<boolean>

    deleteProduct(data: DeleteProductInterface): Promise<boolean>

}