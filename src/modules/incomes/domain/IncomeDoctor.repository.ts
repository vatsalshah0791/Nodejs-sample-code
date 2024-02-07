'use strict'


import { ReadDayIncomesByDoctorInterface, ReadDayIncomesByDoctorResultInterface } from './interfaces/ReadDayIncomesByDoctor.interface'
import { ReadWeekIncomesByDoctorInterface, ReadWeekIncomesByDoctorResultInterface } from './interfaces/ReadWeekIncomesByDoctor.interface'
import { ReadMonthIncomesByDoctorInterface, ReadMonthIncomesByDoctorResultInterface } from './interfaces/ReadMonthIncomesByDoctor.interface'
import { ReadYearIncomesByDoctorInterface, ReadYearIncomesByDoctorResultInterface } from './interfaces/ReadYearIncomesByDoctor.interface'


export default interface IncomeDoctorRepository {

    readDayIncomesByDoctor(data: ReadDayIncomesByDoctorInterface): Promise<ReadDayIncomesByDoctorResultInterface[]>

    readWeekIncomesByDoctor(data: ReadWeekIncomesByDoctorInterface): Promise<ReadWeekIncomesByDoctorResultInterface[]>

    readMonthIncomesByDoctor(data: ReadMonthIncomesByDoctorInterface): Promise<ReadMonthIncomesByDoctorResultInterface[]>

    readYearIncomesByDoctor(data: ReadYearIncomesByDoctorInterface): Promise<ReadYearIncomesByDoctorResultInterface[]>

}