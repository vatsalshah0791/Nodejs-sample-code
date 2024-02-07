'use strict'


import SmProduct from '../entities/SmProduct'


export interface UpdateProductInterface {
    productName:SmProduct['productName']
    id: SmProduct['id']
}
