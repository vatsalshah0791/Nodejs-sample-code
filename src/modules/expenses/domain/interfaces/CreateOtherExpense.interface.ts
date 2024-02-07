'use strict'


import SmOtherExpense from '../entities/SmOthersExpense'


export interface CreateOtherExpenseInterface {
    otherExpense: SmOtherExpense['otherExpense']
    amount: SmOtherExpense['amount']
    isAvailable: SmOtherExpense['isAvailable']
    idSmClinic: SmOtherExpense['idSmClinic']
}

export interface CreateOtherExpenseResultInterface {
    success: boolean
    id?: SmOtherExpense['id']
}