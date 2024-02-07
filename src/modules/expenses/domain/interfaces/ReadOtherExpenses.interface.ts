'use strict'


import SmOtherExpense from '../entities/SmOthersExpense'


export interface ReadOtherExpensesInterface {
    idSmClinic: SmOtherExpense['idSmClinic']
}

export interface ReadOtherExpensesResultInterface {
    id: SmOtherExpense['id']
    otherExpense: SmOtherExpense['otherExpense']
    currency: string
    amount: SmOtherExpense['amount']
    isAvailable: SmOtherExpense['isAvailable']
}