'use strict'


import SmRentalExpense from '../entities/SmRentalExpense'


export interface UpdateRentalExpenseInterface {
    id: SmRentalExpense['id']
    rentalName: SmRentalExpense['rentalName']
    amount: SmRentalExpense['amount']
    isAvailable: SmRentalExpense['isAvailable']
}