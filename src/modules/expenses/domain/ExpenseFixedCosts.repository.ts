'use strict'


import { CreateRentalExpenseInterface, CreateRentalExpenseResultInterface } from './interfaces/CreateRentalExpense.interface'
import { CreateServiceExpenseInterface, CreateServiceExpenseResultInterface } from './interfaces/CreateServiceExpense.interface'
import { CreateOtherExpenseInterface, CreateOtherExpenseResultInterface } from './interfaces/CreateOtherExpense.interface'
import { ReadRentalExpensesInterface, ReadRentalExpensesResultInterface } from './interfaces/ReadRentalExpenses.interface'
import { ReadWagesInterface, ReadWagesResultInterface } from './interfaces/ReadWages.interface'
import { ReadServiceExpensesInterface, ReadServiceExpensesResultInterface } from './interfaces/ReadServiceExpenses.interface'
import { ReadOtherExpensesInterface, ReadOtherExpensesResultInterface } from './interfaces/ReadOtherExpenses.interface'
import { ReadFixedCostsByMonthInterface, ReadFixedCostsByMonthResultInterface } from './interfaces/ReadFixedCostsByMonth.interface'
import { UpdateRentalExpenseInterface } from './interfaces/UpdateRentalExpense.interface'
import { UpdateServiceExpenseInterface } from './interfaces/UpdateServiceExpense.interface'
import { UpdateOtherExpenseInterface } from './interfaces/UpdateOtherExpense.interface'
import { DeleteRentalExpenseInterface } from './interfaces/DeleteRentalExpense.interface'
import { DeleteServiceExpenseInterface } from './interfaces/DeleteServiceExpense.interface'
import { DeleteOtherExpenseInterface } from './interfaces/DeleteOtherExpense.interface'


export default interface ExpenseFixedCostsRepository {

    createRentalExpense(data: CreateRentalExpenseInterface): Promise<CreateRentalExpenseResultInterface>

    createServiceExpense(data: CreateServiceExpenseInterface): Promise<CreateServiceExpenseResultInterface>

    createOtherExpense(data: CreateOtherExpenseInterface): Promise<CreateOtherExpenseResultInterface>

    readRentalExpenses(data: ReadRentalExpensesInterface): Promise<ReadRentalExpensesResultInterface[]>

    readWages(data: ReadWagesInterface): Promise<ReadWagesResultInterface[]>

    readServiceExpenses(data: ReadServiceExpensesInterface): Promise<ReadServiceExpensesResultInterface[]>

    readOtherExpenses(data: ReadOtherExpensesInterface): Promise<ReadOtherExpensesResultInterface[]>

    readFixedCostsByMonth(data: ReadFixedCostsByMonthInterface): Promise<ReadFixedCostsByMonthResultInterface>

    updateRentalExpense(data: UpdateRentalExpenseInterface): Promise<boolean>

    updateServiceExpense(data: UpdateServiceExpenseInterface): Promise<boolean>

    updateOtherExpense(data: UpdateOtherExpenseInterface): Promise<boolean>

    deleteRentalExpense(data: DeleteRentalExpenseInterface): Promise<boolean>

    deleteServiceExpense(data: DeleteServiceExpenseInterface): Promise<boolean>

    deleteOtherExpense(data: DeleteOtherExpenseInterface): Promise<boolean>

}