'use strict'


export interface ReadCustomerInterface {
    idAccount: string
}

export interface ReadCustomerResultInterface {
    success: boolean
    customerId?: string
    email?: string
}