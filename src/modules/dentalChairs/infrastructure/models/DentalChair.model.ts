'use strict'


import { QueryResult, Pool } from 'pg'

import DentalChairRepository from '../../domain/DentalChair.repository'

import { CheckPlanInterface } from '../../domain/interfaces/CheckPlan.interface'
import { CreateDentalChairInterface, CreateDentalChairResultInterface } from '../../domain/interfaces/CreateDentalChair.interface'
import { ReadDentalChairsInterface, ReadDentalChairsResultInterface } from '../../domain/interfaces/ReadDentalChairs.interface'
import { UpdateDentalChairInterface } from '../../domain/interfaces/UpdateDentalChair.interface'
import { DeleteDentalChairInterface } from '../../domain/interfaces/DeleteDentalChair.interface'

import checkPlanTransaction from './transactions/checkPlan.transaction'
import createDentalChairQuery from './querys/createDentalChair.query'
import readDentalChairsQuery from './querys/readDentalChairs.query'
import updateDentalChairsQuery from './querys/updateDentalChairs.query'
import deleteDentalChairQuery from './querys/deleteDentalChair.query'


export default class DentalChairModel implements DentalChairRepository {
    constructor(
        private readonly db: () => Pool,
        private readonly checkSelect: (param: QueryResult) => boolean,
        private readonly checkInsert: (param: QueryResult) => boolean
    ) {}
    async checkPlan(data: CheckPlanInterface): Promise<boolean> {
        try {
            const [selectAppPlan, selectCountDentalChairs] = checkPlanTransaction
            const values = [data.idClinic]
            const selectAppPlanResult: QueryResult = await this.db().query(selectAppPlan, values)
            if(!this.checkSelect(selectAppPlanResult)) {
                return false
            }
            const selectCountDentalChairsResult: QueryResult = await this.db().query(selectCountDentalChairs, values)
            const availableDentalChairs = selectAppPlanResult.rows[0].dental_chairs
            const dentalChairsCreated = selectCountDentalChairsResult.rows[0].total_dental_chairs
            if(availableDentalChairs === -1) {
                return true
            }
            if(dentalChairsCreated >= availableDentalChairs) {
                return false
            }
            return true
        } catch (error) {
            console.error('ERROR -- MODEL: DentalChairModel.checkPlan')
            throw error
        }
    }
    async createDentalChair(data: CreateDentalChairInterface): Promise<CreateDentalChairResultInterface> {
        try {
            const values = [
                data.chairName,
                data.idSmClinic
            ]
            const createDentalChairQueryResult: QueryResult = await this.db().query(createDentalChairQuery, values)
            if(this.checkInsert(createDentalChairQueryResult)) {
                const modelResult: CreateDentalChairResultInterface = {
                    success: true,
                    id: createDentalChairQueryResult.rows[0].id
                }
                return modelResult
            }
            const modelResult: CreateDentalChairResultInterface = { success: false }
            return modelResult
        } catch (error) {
            console.error('ERROR -- MODEL: DentalChairModel.createDentalChair')
            throw error
        }
    }
    async readDentalChairs(data: ReadDentalChairsInterface): Promise<ReadDentalChairsResultInterface[]> {
        try {
            const values = [data.idClinic]
            const readDentalChairsQueryResult: QueryResult = await this.db().query(readDentalChairsQuery, values)
            const dentalChairs = readDentalChairsQueryResult.rows.map(element => {
                const newElement: ReadDentalChairsResultInterface = {
                    id: element.id,
                    chairName: element.chair_name,
                    isAvailable: element.is_available
                }
                return newElement
            })
            return dentalChairs
        } catch (error) {
            console.error('ERROR -- MODEL: DentalChairModel.readDentalChairs')
            throw error
        }
    }
    async updateDentalChair(data: UpdateDentalChairInterface): Promise<boolean> {
        try {
            const values = [
                data.chairName,
                data.isAvailable,
                data.id
            ]
            const updateDentalChairsQueryResult: QueryResult = await this.db().query(updateDentalChairsQuery, values)
            return this.checkInsert(updateDentalChairsQueryResult)
        } catch (error) {
            console.error('ERROR -- MODEL: DentalChairModel.updateDentalChair')
            throw error
        }
    }
    async deleteDentalChair(data: DeleteDentalChairInterface): Promise<boolean> {
        try {
            const values = [data.id]
            const deleteDentalChairQueryResult: QueryResult = await this.db().query(deleteDentalChairQuery, values)
            return this.checkInsert(deleteDentalChairQueryResult)
        } catch (error) {
            console.error('ERROR -- MODEL: DentalChairModel.deleteDentalChair')
            throw error
        }
    }
}