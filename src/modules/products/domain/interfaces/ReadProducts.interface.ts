'use strict'


import SmProduct from '../entities/SmProduct'


export interface ReadProductsInterface {
    idClinic: string
}

export interface ReadProductsResultInterface {
    id: SmProduct['id']
    productName:SmProduct['productName']
}