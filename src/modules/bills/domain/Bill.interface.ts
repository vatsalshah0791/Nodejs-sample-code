'use strict'

import SmBill from './entities/SmBill'
import SmBillItem from './entities/SmBillItem'

interface BillInterface {
    amount: SmBillItem['amount']
    unitPrice: SmBillItem['unitPrice']
    idProduct: SmBillItem['idSmProduct']
}

interface ItemsInterface {
    id: SmBillItem['id']
    amount: SmBillItem['amount']
    unitPrice: SmBillItem['unitPrice']
    product: string
}

export interface CreateBillInterface {
    no: SmBill['noBill']
    date: SmBill['dateBill']
    idProvider: SmBill['idSmProvider']
    idClinic: SmBill['idSmClinic']
    items: BillInterface[]
}
export interface CreateBillResultInterface {
    success: boolean
    id: SmBill['id']
}

export interface ReadByDateInterface {
    month: number
    year: number
    idClinic: SmBill['idSmClinic']
}
export interface ReadByDateResultInterface {
    id: SmBill['id']
    no: SmBill['noBill']
    date: SmBill['dateBill']
    provider: string
    total: number
    currency: string
}

export interface ReadBillInterface { id: SmBill['id'] }
export interface ReadBillResultInterface {
    success: boolean
    id?: SmBill['id']
    no?: SmBill['noBill']
    date?: SmBill['dateBill']
    provider?: string
    currency?: string
    items?: ItemsInterface[]
}