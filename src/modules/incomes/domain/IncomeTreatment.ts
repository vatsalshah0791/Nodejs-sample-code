'use strict'


import { ReadDayIncomesByTreatmentInterface, ReadDayIncomesByTreatmentResultInterface } from './interfaces/ReadDayIncomesByTreatment.interface'
import { ReadWeekIncomesByTreatmentInterface, ReadWeekIncomesByTreatmentResultInterface } from './interfaces/ReadWeekIncomesByTreatment.interface'
import { ReadMonthIncomesByTreatmentInterface, ReadMonthIncomesByTreatmentResultInterface } from './interfaces/ReadMonthIncomesByTreatment.interface'
import { ReadYearIncomesByTreatmentInterface, ReadYearIncomesByTreatmentResultInterface } from './interfaces/ReadYearIncomesByTreatment.interface'


export default interface IncomeTreatmentRepository {

    readDayIncomesByTreatment(data: ReadDayIncomesByTreatmentInterface): Promise<ReadDayIncomesByTreatmentResultInterface[]>

    readWeekIncomesByTreatment(data: ReadWeekIncomesByTreatmentInterface): Promise<ReadWeekIncomesByTreatmentResultInterface[]>

    readMonthIncomesByTreatment(data: ReadMonthIncomesByTreatmentInterface): Promise<ReadMonthIncomesByTreatmentResultInterface[]>

    readYearIncomesByTreatment(data: ReadYearIncomesByTreatmentInterface): Promise<ReadYearIncomesByTreatmentResultInterface[]>

}