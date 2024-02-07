'use strict'


import SmProduct from '../entities/SmProduct'


export interface CreateProductInterface {
    productName: SmProduct['productName']
    idSmClinic: SmProduct['idSmClinic']
}

export interface CreateProductResultInterface {
    success: boolean
    id?: SmProduct['id']
}