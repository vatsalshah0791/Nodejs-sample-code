'use strict'


import SmRentalExpense from '../entities/SmRentalExpense'


export interface ReadRentalExpensesInterface {
    idSmClinic: SmRentalExpense['idSmClinic']
}

export interface ReadRentalExpensesResultInterface {
    id: SmRentalExpense['id']
    rentalName: SmRentalExpense['rentalName']
    currency: string
    amount: SmRentalExpense['amount']
    isAvailable: SmRentalExpense['isAvailable']
}