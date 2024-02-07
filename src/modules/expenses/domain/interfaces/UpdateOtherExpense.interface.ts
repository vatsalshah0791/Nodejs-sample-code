'use strict'


import SmOtherExpense from '../entities/SmOthersExpense'


export interface UpdateOtherExpenseInterface {
    id: SmOtherExpense['id']
    otherExpense: SmOtherExpense['otherExpense']
    amount: SmOtherExpense['amount']
    isAvailable: SmOtherExpense['isAvailable']
}