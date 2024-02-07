'use strict'


import SmServiceExpense from '../entities/SmServiceExpense'


export interface ReadServiceExpensesInterface {
    idSmClinic: SmServiceExpense['idSmClinic']
}

export interface ReadServiceExpensesResultInterface {
    id: SmServiceExpense['id']
    serviceName: SmServiceExpense['serviceName']
    currency: string
    amount: SmServiceExpense['amount']
    isAvailable: SmServiceExpense['isAvailable']
}