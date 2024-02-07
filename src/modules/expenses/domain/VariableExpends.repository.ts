'use strict'


import { ReadDayExpensesByProviderTypeInterface, ReadDayExpensesByProviderTypeResultInterface } from './interfaces/ReadDayExpensesByProviderType.interface'
import { ReadWeekExpensesByProviderTypeInterface, ReadWeekExpensesByProviderTypeResultInterface } from './interfaces/ReadWeekExpensesByProviderType.interface'
import { ReadMonthExpensesByProviderTypeInterface, ReadMonthExpensesByProviderTypeResultInterface } from './interfaces/ReadMonthExpensesByProviderType.interface'
import { ReadYearExpensesByProviderTypeInterface, ReadYearExpensesByProviderTypeResultInterface } from './interfaces/ReadYearExpensesByProviderType.interface'
import { ReadCommissionsByMonthInterface, ReadCommissionsByMonthResultInterface } from './interfaces/ReadCommissionsByMonth.interface'
import { ReadCommissionsByYearInterface, ReadCommissionsByYearResultInterface } from './interfaces/ReadCommissionsByYear.interface'
import { ReadCommissionsByDoctorInterface, ReadCommissionsByDoctorResultInterface } from './interfaces/ReadCommisionsByDoctor.interface'
import { ReadMonthVariableExpendsInterface, ReadMonthVariableExpendsResultInterface } from './interfaces/ReadMonthVariableExpends.interface'
import { ReadYearVariableExpendsInterface, ReadYearVariableExpendsResultInterface } from './interfaces/ReadYearVariableExpends.interface'


export default interface VariableExpendsRepository {

    readDayExpensesByProviderType(data: ReadDayExpensesByProviderTypeInterface): Promise<ReadDayExpensesByProviderTypeResultInterface[]>

    readWeekExpensesByProviderType(data: ReadWeekExpensesByProviderTypeInterface): Promise<ReadWeekExpensesByProviderTypeResultInterface[]>

    readMonthExpensesByProviderType(data: ReadMonthExpensesByProviderTypeInterface): Promise<ReadMonthExpensesByProviderTypeResultInterface[]>

    readYearExpensesByProviderType(data: ReadYearExpensesByProviderTypeInterface): Promise<ReadYearExpensesByProviderTypeResultInterface[]>

    readCommissionsByMonth(data: ReadCommissionsByMonthInterface): Promise<ReadCommissionsByMonthResultInterface[]>

    readCommissionsByYear(data: ReadCommissionsByYearInterface): Promise<ReadCommissionsByYearResultInterface[]>

    readCommissionsByDoctor(data: ReadCommissionsByDoctorInterface): Promise<ReadCommissionsByDoctorResultInterface[]>

    readMonthVariableExpends(data: ReadMonthVariableExpendsInterface): Promise<ReadMonthVariableExpendsResultInterface>

    readYearVariableExpends(data: ReadYearVariableExpendsInterface): Promise<ReadYearVariableExpendsResultInterface>

}