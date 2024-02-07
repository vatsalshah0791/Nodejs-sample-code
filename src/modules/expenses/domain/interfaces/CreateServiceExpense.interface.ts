'use strict'


import SmServiceExpense from '../entities/SmServiceExpense'


export interface CreateServiceExpenseInterface {
    serviceName: SmServiceExpense['serviceName']
    amount: SmServiceExpense['amount']
    isAvailable: SmServiceExpense['isAvailable']
    idSmClinic: SmServiceExpense['idSmClinic']
}

export interface CreateServiceExpenseResultInterface {
    success: boolean
    id?: SmServiceExpense['id']
}