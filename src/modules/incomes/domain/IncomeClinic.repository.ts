'use strict'


import { ReadPercentagesClinicInterface, ReadPercentagesClinicResultInterface } from './interfaces/ReadPercentagesClinic.interface'
import { ReadDayIncomesByClinicInterface, ReadDayIncomesByClinicResultInterface } from './interfaces/ReadDayIncomesByClinic.interface'
import { ReadWeekIncomesByClinicInterface, ReadWeekIncomesByClinicResultInterface } from './interfaces/ReadWeekIncomesByClinic.interface'
import { ReadMonthIncomesByClinicInterface, ReadMonthIncomesByClinicResultInterface } from './interfaces/ReadMonthIncomesByClinic.interface'
import { ReadYearIncomesByClinicInterface, ReadYearIncomesByClinicResultInterface } from './interfaces/ReadYearIncomesByClinic.interface'


export default interface IncomeClinicRepository {

    readPercentagesByClinic(data: ReadPercentagesClinicInterface): Promise<ReadPercentagesClinicResultInterface>

    readDayIncomesByClinic(data: ReadDayIncomesByClinicInterface): Promise<ReadDayIncomesByClinicResultInterface[]>

    readWeekIncomesByClinic(data: ReadWeekIncomesByClinicInterface): Promise<ReadWeekIncomesByClinicResultInterface[]>

    readMonthIncomesByClinic(data: ReadMonthIncomesByClinicInterface): Promise<ReadMonthIncomesByClinicResultInterface[]>

    readYearIncomesByClinic(data: ReadYearIncomesByClinicInterface): Promise<ReadYearIncomesByClinicResultInterface[]>

}