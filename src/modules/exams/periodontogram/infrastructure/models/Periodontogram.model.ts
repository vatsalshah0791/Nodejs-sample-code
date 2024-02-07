'use strict'


import { QueryResult, Pool } from 'pg'

import PeriodontogramRepository from '../../domain/Periodontogram.repository'

import { ReadPeriodontogramInterface, ReadPeriodontogramResultInterface } from '../../domain/interfaces/ReadPeriodontogram.interface'
import { ReadPeriodontogramTeethInterface, ReadPeriodontogramTeethResultInterface } from '../../domain/interfaces/ReadPeriodontogramTeeth.interface'
import { UpdateQuestionsInterface } from '../../domain/interfaces/UpdateQuestions.interface'
import { UpdateMobilityInterface } from '../../domain/interfaces/UpdateMobility.interface'
import { UpdateFurcationInjuryInterface } from '../../domain/interfaces/UpdateFurcationInjury.interface'
import { UpdateGingivalMarginInterface } from '../../domain/interfaces/UpdateGingivalMargin.interface'
import { UpdatePeriodontalPocketInterface } from '../../domain/interfaces/UpdatePeriodontalPocket.interface'

import readPeriodontogramQuery from './querys/readPeriodontogram.query'
import readPeriodontogramTeethQuery from './querys/readPeriodontogramTeeth.query'
import updateQuestionsQuery from './querys/updateQuestions.query'
import updateMobilityQuery from './querys/updateMobility.query'
import updateFurcationInjuryQuery from './querys/updateFurcationInjury.query'
import updateGingivalMarginQuery from './querys/updateGingivalMargin.query'
import updatePeriodontalPocketQuery from './querys/updatePeriodontalPocket.query'


export default class PeriodontogramModel implements PeriodontogramRepository {
    constructor(
        private readonly db: () => Pool,
        private readonly checkSelect: (param: QueryResult) => boolean,
        private readonly checkInsert: (param: QueryResult) => boolean
    ) {}
    async readPeriodontogram(data: ReadPeriodontogramInterface): Promise<ReadPeriodontogramResultInterface[]> {
        try {
            const values = [data.idSmPatient]
            const readPeriodontogramQueryResult: QueryResult = await this.db().query(readPeriodontogramQuery, values)
            const periodontogram = readPeriodontogramQueryResult.rows.map(element => {
                const newElement: ReadPeriodontogramResultInterface = {
                    id: element.id,
                    teeth: element.teeth,
                    questions: element.questions,
                    mobility: element.mobility,
                    furcationInjury: element.furcation_injury,
                    gingivalMargin: element.gingival_margin,
                    periodontalPocket: element.periodontal_pocket
                }
                return newElement
            })
            return periodontogram
        } catch (error) {
            console.error('ERROR -- MODEL: PeriodontogramModel.readPeriodontogram')
            throw error
        }
    }
    async readPeriodontogramTeeth(data: ReadPeriodontogramTeethInterface): Promise<ReadPeriodontogramTeethResultInterface> {
        try {
            const values = [
                data.idSmPatient,
                data.teeth
            ]
            const readPeriodontogramTeethQueryResult: QueryResult = await this.db().query(readPeriodontogramTeethQuery, values)
            if(this.checkSelect(readPeriodontogramTeethQueryResult)) {
                const periodontogram = readPeriodontogramTeethQueryResult.rows[0]
                const modelResult: ReadPeriodontogramTeethResultInterface = {
                    success: true,
                    id: periodontogram.id,
                    questions: periodontogram.questions,
                    mobility: periodontogram.mobility,
                    furcationInjury: periodontogram.furcation_injury,
                    gingivalMargin: periodontogram.gingival_margin,
                    periodontalPocket: periodontogram.periodontal_pocket
                }
                return modelResult
            }
            const modelResult: ReadPeriodontogramTeethResultInterface = { success: false }
            return modelResult
        } catch (error) {
            console.error('ERROR -- MODEL: PeriodontogramModel.readPeriodontogramTeeth')
            throw error
        }
    }
    async updateQuestions(data: UpdateQuestionsInterface): Promise<boolean> {
        try {
            const values = [
                data.option,
                data.title,
                data.value,
                data.id
            ]
            const updateQuestionsQueryResult: QueryResult = await this.db().query(updateQuestionsQuery, values)
            return this.checkInsert(updateQuestionsQueryResult)
        } catch (error) {
            console.error('ERROR -- MODEL: PeriodontogramModel.updateQuestions')
            throw error
        }
    }
    async updateMobility(data: UpdateMobilityInterface): Promise<boolean> {
        try {
            const values = [
                data.option,
                data.value,
                data.id
            ]
            const updateMobilityQueryResult: QueryResult = await this.db().query(updateMobilityQuery, values)
            return this.checkInsert(updateMobilityQueryResult)
        } catch (error) {
            console.error('ERROR -- MODEL: PeriodontogramModel.updateMobility')
            throw error
        }
    }
    async updateFurcationInjury(data: UpdateFurcationInjuryInterface): Promise<boolean> {
        try {
            const values = [
                data.option,
                data.value,
                data.id
            ]
            const updateFurcationInjuryQueryResult: QueryResult = await this.db().query(updateFurcationInjuryQuery, values)
            return this.checkInsert(updateFurcationInjuryQueryResult)
        } catch (error) {
            console.error('ERROR -- MODEL: PeriodontogramModel.updateMobility')
            throw error
        }
    }
    async updateGingivalMargin(data: UpdateGingivalMarginInterface): Promise<boolean> {
        try {
            const values = [
                {
                    mesial: data.mesial,
                    central: data.central,
                    distal: data.distal
                },
                data.id
            ]
            const updateGingivalMarginQueryResult: QueryResult = await this.db().query(updateGingivalMarginQuery, values)
            return this.checkInsert(updateGingivalMarginQueryResult)
        } catch (error) {
            console.error('ERROR -- MODEL: PeriodontogramModel.updateGingivalMargin')
            throw error
        }
    }
    async updatePeriodontalPocket(data: UpdatePeriodontalPocketInterface): Promise<boolean> {
        try {
            const values = [
                {
                    mesial: data.mesial,
                    central: data.central,
                    distal: data.distal
                },
                data.id
            ]
            const updatePeriodontalPocketQueryResult: QueryResult = await this.db().query(updatePeriodontalPocketQuery, values)
            return this.checkInsert(updatePeriodontalPocketQueryResult)
        } catch (error) {
            console.error('ERROR -- MODEL: PeriodontogramModel.updatePeriodontalPocket')
            throw error
        }
    }
}