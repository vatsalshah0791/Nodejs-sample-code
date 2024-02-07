'use strict'


import SmServiceExpense from '../entities/SmServiceExpense'


export interface UpdateServiceExpenseInterface {
    id: SmServiceExpense['id']
    serviceName: SmServiceExpense['serviceName']
    amount: SmServiceExpense['amount']
    isAvailable: SmServiceExpense['isAvailable']
}