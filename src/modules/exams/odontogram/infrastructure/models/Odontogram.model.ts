'use strict'


import { QueryResult, Pool } from 'pg'

import OdontogramRepository from '../../domain/Odontogram.repository'

import { ReadOdontogramInterface, ReadOdontogramResultInterface } from '../../domain/interfaces/ReadOdontogram.interface'
import { ReadOdontogramTeethInterface, ReadOdontogramTeethResultInterface } from '../../domain/interfaces/ReadOdontogramTeeth.interface'
import { UpdateQuestionsInterface } from '../../domain/interfaces/UpdateQuestions.interface'
import { UpdateGeneralOdontologyInterface } from '../../domain/interfaces/UpdateGeneralOdontology.interface'
import { UpdateProsthesisInterface } from '../../domain/interfaces/UpdateProsthesis.interface'
import { UpdateProsthesisMultilineInterface } from '../../domain/interfaces/UpdateProsthesisMultiline.interface'
import { UpdateEndodonticsInterface } from '../../domain/interfaces/UpdateEndodontics.interface'
import { UpdateOrthodonticsInterface } from '../../domain/interfaces/UpdateOrthodontics.interface'

import readOdontogramQuery from './querys/readOdontogram.query'
import readOdontogramTeethQuery from './querys/readOdontogramTeeth.query'
import updateQuestionsTransactions from './transactions/updateQuestions.transactions'
import updateGeneralOdontologyQuery from './querys/updateGeneralOdontology.query'
import updateProsthesisQuery from './querys/updateProsthesis.query'
import updateProsthesisMultilineQuery from './querys/updateProsthesisMultiline.query'
import updateEndodonticsQuery from './querys/updateEndodontics.query'
import updateOrthodonticsQuery from './querys/updateOrthodontics.query'


export default class OdontogramModel implements OdontogramRepository {
    constructor(
        private readonly db: () => Pool,
        private readonly checkSelect: (param: QueryResult) => boolean,
        private readonly checkInsert: (param: QueryResult) => boolean
    ) {}
    async readOdontogram(data: ReadOdontogramInterface): Promise<ReadOdontogramResultInterface[]> {
        try {
            const values = [data.idSmPatient]
            const readOdontogramQueryResult: QueryResult = await this.db().query(readOdontogramQuery, values)
            const odontogram = readOdontogramQueryResult.rows.map(element => {
                const newElement: ReadOdontogramResultInterface = {
                    id: element.id,
                    teeth: element.teeth,
                    questions: element.questions,
                    generalOdontology: element.general_odontology,
                    prosthesis: element.prosthesis,
                    endodontics: element.endodontics,
                    orthodontics: element.orthodontics
                }
                return newElement
            })
            return odontogram
        } catch (error) {
            console.error('ERROR -- MODEL: OdontogramModel.readOdontogram')
            throw error
        }
    }
    async readOdontogramTeeth(data: ReadOdontogramTeethInterface): Promise<ReadOdontogramTeethResultInterface> {
        try {
            const values = [
                data.idSmPatient,
                data.teeth
            ]
            const readOdontogramTeethQueryResult: QueryResult = await this.db().query(readOdontogramTeethQuery, values)
            if(this.checkSelect(readOdontogramTeethQueryResult)) {
                const odontogram = readOdontogramTeethQueryResult.rows[0]
                const modelResult: ReadOdontogramTeethResultInterface = {
                    success: true,
                    id: odontogram.id,
                    questions: odontogram.questions,
                    generalOdontology: odontogram.general_odontology,
                    prosthesis: odontogram.prosthesis,
                    endodontics: odontogram.endodontics,
                    orthodontics: odontogram.orthodontics
                }
                return modelResult
            }
            const modelResult: ReadOdontogramTeethResultInterface = { success: false }
            return modelResult
        } catch (error) {
            console.error('ERROR -- MODEL: OdontogramModel.readOdontogramTeeth')
            throw error
        }
    }
    async updateQuestions(data: UpdateQuestionsInterface): Promise<boolean> {
        try {
            const values = [
                data.option,
                data.value,
                data.id
            ]
            const [updateQuestions, resetQuestions] = updateQuestionsTransactions
            if(['healthy', 'absent', 'primaryTooth', 'implant', 'badTreatment'].includes(data.option)) {
                const updateQuestionsQueryResult: QueryResult = await this.db().query(resetQuestions, values)
                return this.checkInsert(updateQuestionsQueryResult)
            }
            const updateQuestionsQueryResult: QueryResult = await this.db().query(updateQuestions, values)
            return this.checkInsert(updateQuestionsQueryResult)
        } catch (error) {
            console.error('ERROR -- MODEL: OdontogramModel.updateQuestions')
            throw error
        }
    }
    async updateGeneralOdontology(data: UpdateGeneralOdontologyInterface): Promise<boolean> {
        try {
            const values = [
                data.option,
                data.title,
                data.value,
                data.id
            ]
            const updateGeneralOdontologyQueryResult: QueryResult = await this.db().query(updateGeneralOdontologyQuery, values)
            return this.checkInsert(updateGeneralOdontologyQueryResult)
        } catch (error) {
            console.error('ERROR -- MODEL: OdontogramModel.updateGeneralOdontology')
            throw error
        }
    }
    async updateProsthesis(data: UpdateProsthesisInterface): Promise<boolean> {
        try {
            const values = [
                data.option,
                data.value,
                data.id
            ]
            const updateProsthesisQueryResult: QueryResult = await this.db().query(updateProsthesisQuery, values)
            return this.checkInsert(updateProsthesisQueryResult)
        } catch (error) {
            console.error('ERROR -- MODEL: OdontogramModel.updateProsthesis')
            throw error
        }
    }
    async updateProsthesisMultiline(data: UpdateProsthesisMultilineInterface): Promise<boolean> {
        try {
            const values = [
                data.option,
                data.title,
                data.value,
                data.id
            ]
            const updateProsthesisMultilineQueryResult: QueryResult = await this.db().query(updateProsthesisMultilineQuery, values)
            return this.checkInsert(updateProsthesisMultilineQueryResult)
        } catch (error) {
            console.error('ERROR -- MODEL: OdontogramModel.updateProsthesisMultiline')
            throw error
        }
    }
    async updateEndodontics(data: UpdateEndodonticsInterface): Promise<boolean> {
        try {
            const values = [
                data.option,
                data.value,
                data.id
            ]
            const updateEndodonticsQueryResult: QueryResult = await this.db().query(updateEndodonticsQuery, values)
            return this.checkInsert(updateEndodonticsQueryResult)
        } catch (error) {
            console.error('ERROR -- MODEL: OdontogramModel.updateEndodontics')
            throw error
        }
    }
    async updateOrthodontics(data: UpdateOrthodonticsInterface): Promise<boolean> {
        try {
            const values = [
                data.option,
                data.value,
                data.id
            ]
            const updateOrthodonticsQueryResult: QueryResult = await this.db().query(updateOrthodonticsQuery, values)
            return this.checkInsert(updateOrthodonticsQueryResult)
        } catch (error) {
            console.error('ERROR -- MODEL: OdontogramModel.updateOrthodontics')
            throw error
        }
    }
}