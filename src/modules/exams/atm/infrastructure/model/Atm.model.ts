'use strict'


import { QueryResult, Pool } from 'pg'

import AtmRepository from '../../domain/Atm.repository'

import { CheckColumnNameExists } from '../../domain/interface/CheckColumnNameExists.interface'
import { ReadAtmInterface, ReadAtmResultInterface } from '../../domain/interface/ReadAtm.interface'
import { UpdateExamNotesInterface } from '../../domain/interface/UpdateExamNotes.interface'
import { UpdateAtmInterface } from '../../domain/interface/UpdateAtm.interface'
import { UpdateAtmMultilineInterface } from '../../domain/interface/UpdateAtmMultiline.interface'

import checkColumnNameExistsQuery from './querys/checkColumnNameExists.query'
import readAtmQuery from './querys/readAtm.query'
import updateExamNotesQuery from './querys/updateExamNotes.query'


export default class AtmModel implements AtmRepository {
    constructor(
        private readonly db: () => Pool,
        private readonly checkSelect: (param: QueryResult) => boolean,
        private readonly checkInsert: (param: QueryResult) => boolean
    ) {}
    async checkColumnNameExists(data: CheckColumnNameExists): Promise<boolean> {
        try {
            const checkColumnNameExistsQueryResult: QueryResult = await this.db().query(checkColumnNameExistsQuery)
            const allowedColumns = checkColumnNameExistsQueryResult.rows.map(element => element.column_name)
            if(allowedColumns.includes(data.key)) {
                return true
            }
            return false
        } catch (error) {
            console.error('ERROR -- MODEL: AtmModel.checkColumnNameExists')
            throw error
        }
    }
    async readAtm(data: ReadAtmInterface): Promise<ReadAtmResultInterface> {
        try {
            const values = [data.idSmPatient]
            const readAtmQueryResult: QueryResult = await this.db().query(readAtmQuery, values)
            if(this.checkSelect(readAtmQueryResult)) {
                const atm = readAtmQueryResult.rows[0]
                const modelResult: ReadAtmResultInterface = {
                    success: true,
                    id: atm.id,
                    examNotes: atm.exam_notes,
                    questions:  atm.questions,
                    snap: atm.snap,
                    crepitation: atm.crepitation,
                    pain: atm.pain,
                    opening: atm.opening,
                    closing: atm.closing,
                    treatment: atm.treatment
                }
                return modelResult
            }
            const modelResult: ReadAtmResultInterface = { success: false }
            return modelResult
        } catch (error) {
            console.error('ERROR -- MODEL: ExamModel.readAtm')
            throw error
        }
    }
    async updateExamNotes(data: UpdateExamNotesInterface): Promise<boolean> {
        try {
            const values = [
                data.note,
                data.id
            ]
            const updateExamNotesQueryResult: QueryResult = await this.db().query(updateExamNotesQuery, values)
            return this.checkInsert(updateExamNotesQueryResult)
        } catch (error) {
            console.error('ERROR -- MODEL: AtmModel.updateExamNotes')
            throw error
        }
    }
    async updateAtm(data: UpdateAtmInterface): Promise<boolean> {
        try {
            const values = [
                data.option,
                data.value,
                data.key,
                data.id
            ]
            const updateSmAtmResult: QueryResult = await this.db().query(/*sql*/`
                UPDATE sm_atm

                SET ${data.key} = (
                    SELECT jsonb_set(
                        ${data.key},
                        '{data}',
                        COALESCE(
                            jsonb_agg(
                                CASE
                                    WHEN item->>'title' = $1
                                    THEN jsonb_set(item, '{value}', $2::jsonb)
                                    WHEN 'treatment' = $3
                                    THEN item
                                    WHEN 'questions' = $3
                                    THEN item
                                    ELSE jsonb_set(item, '{value}', 'false'::jsonb)
                                END
                            ),
                            '[]'::jsonb
                        )
                    )
                    FROM jsonb_array_elements(${data.key}->'data') AS item
                )

                WHERE id = $4
                AND deleted_at IS NULL
            `, values)
            return this.checkInsert(updateSmAtmResult)
        } catch (error) {
            console.error('ERROR -- MODEL: AtmModel.updateAtm')
            throw error
        }
    }
    async updateAtmMultiline(data: UpdateAtmMultilineInterface): Promise<boolean> {
        try {
            const values = [
                data.option,
                data.title,
                data.value,
                data.id
            ]
            const updateSmAtmResult: QueryResult = await this.db().query(/*sql*/`
                UPDATE sm_atm

                SET ${data.key} = (
                    SELECT jsonb_set(
                        ${data.key},
                        '{data}',
                        COALESCE(
                            jsonb_agg(
                                CASE
                                    WHEN item->>'title' = $1
                                    THEN jsonb_set(
                                        item,
                                        '{values}',
                                        (
                                            SELECT jsonb_agg(
                                                CASE
                                                    WHEN vals->>'title' = $2
                                                    THEN jsonb_set(vals, '{value}', $3::jsonb)
                                                    ELSE jsonb_set(vals, '{value}', 'false'::jsonb)
                                                END
                                            )
                                            FROM jsonb_array_elements(item->'values') AS vals
                                        )::jsonb
                                    )
                                    ELSE item
                                END
                            ),
                            '[]'::jsonb
                        )
                    )
                    FROM jsonb_array_elements(${data.key}->'data') AS item
                )

                WHERE id = $4
                AND deleted_at IS NULL
            `, values)
            return this.checkInsert(updateSmAtmResult)
        } catch (error) {
            console.error('ERROR -- MODEL: AtmModel.updateAtmMultiline')
            throw error
        }
    }
}