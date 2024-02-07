'use strict'


import SmRentalExpense from '../entities/SmRentalExpense'


export interface CreateRentalExpenseInterface {
    rentalName: SmRentalExpense['rentalName']
    amount: SmRentalExpense['amount']
    isAvailable: SmRentalExpense['isAvailable']
    idSmClinic: SmRentalExpense['idSmClinic']
}

export interface CreateRentalExpenseResultInterface {
    success: boolean
    id?: SmRentalExpense['id']
}