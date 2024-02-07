'use strict'


import { QueryResult, Pool } from 'pg'

import DoctorRepository from '../../domain/Doctor.repository'

import { CheckPlanInterface } from '../../domain/interfaces/CheckPlan.interface'

import checkPlanDoctorTransaction from './transactions/checkPlanDoctor.transaction'


export default class DoctorModel implements DoctorRepository {
    constructor(
        private readonly db: () => Pool,
        private readonly checkSelect: (param: QueryResult) => boolean
    ) {}
    async checkPlan(data: CheckPlanInterface): Promise<boolean> {
        try {
            const values = [data.idAccount]
            const [selectAppPlan, selectCountDoctors] = checkPlanDoctorTransaction
            const selectAppPlanResult: QueryResult = await this.db().query(selectAppPlan, values)
            if(!this.checkSelect(selectAppPlanResult)) {
                return false
            }
            const selectCountDoctorsResult: QueryResult = await this.db().query(selectCountDoctors, values)
            const availableDoctors = selectAppPlanResult.rows[0].doctors
            const doctorsCreated = selectCountDoctorsResult.rows[0].total_doctors
            if(availableDoctors === -1) {
                return true
            }
            if(doctorsCreated >= availableDoctors) {
                return false
            }
            return true
        } catch (error) {
            console.error('ERROR -- MODEL: DoctorModel.checkPlan')
            throw error
        }
    }
}