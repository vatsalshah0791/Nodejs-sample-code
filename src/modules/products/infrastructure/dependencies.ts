'use strict'


import {
    db,
    checkSelect,
    checkInsert,
    errorHandler
} from './shared.import'

import ProductModel from './models/Product.model'

import CreateProductApplication from '../application/CreateProduct.application'
import ReadProductsApplication from '../application/ReadProducts.application'
import UpdateProductApplication from '../application/UpdateProduct.application'
import DeleteProductApplication from '../application/DeleteProduct.application'

import CreateProductController from './controllers/CreateProduct.controller'
import ReadProductsController from './controllers/ReadProducts.controller'
import UpdateProductController from './controllers/UpdateProduct.controller'
import DeleteProductController from './controllers/DeleteProduct.controller'


const productModel = new ProductModel(db, checkSelect, checkInsert)

const createProductApplication = new CreateProductApplication(productModel)
const readProductsApplication = new ReadProductsApplication(productModel)
const updateProductApplication = new UpdateProductApplication(productModel)
const deleteProductApplication = new DeleteProductApplication(productModel)

export const createProductController = new CreateProductController(createProductApplication, errorHandler)
export const readProductsController = new ReadProductsController(readProductsApplication, errorHandler)
export const updateProductController = new UpdateProductController(updateProductApplication, errorHandler)
export const deleteProductController = new DeleteProductController(deleteProductApplication, errorHandler)
