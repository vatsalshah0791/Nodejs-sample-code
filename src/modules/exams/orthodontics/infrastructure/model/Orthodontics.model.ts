'use strict'


import { QueryResult, Pool } from 'pg'

import OrthodonticsRepository from '../../domain/Orthodontics.repository'

import { CheckColumnNameExists } from '../../domain/interface/CheckColumnNameExists.interface'
import { ReadOrthodonticsInterface, ReadOrthodonticsResultInterface } from '../../domain/interface/ReadOrthodontics'
import { UpdateExamNotesInterface } from '../../domain/interface/UpdateExamNotes.interface'
import { UpdateOrthodonticsInterface } from '../../domain/interface/UpdateOrthodontics.interface'
import { UpdateOverbiteHorizontalInterface } from '../../domain/interface/UpdateOverbiteHorizontal.interface'
import { UpdateOverbiteVerticalInterface } from '../../domain/interface/UpdateOverbiteVertical.interface'
import { UpdateMiddleLineInterface } from '../../domain/interface/UpdateMiddleLine.interface'

import checkColumnNameExistsQuery from './querys/checkColumnNameExists.query'
import readOrthodonticsQuery from './querys/readOrthodontics.query'
import updateExamNotesQuery from './querys/updateExamNotes.query'
import updateOverbiteHorizontalQuery from './querys/updateOverbiteHorizontal.query'
import updateOverbiteVerticalQuery from './querys/updateOverbiteVertical.query'
import updateMiddleLineQuery from './querys/updateMiddleLine.query'


export default class OrthodonticsModel implements OrthodonticsRepository {
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
            console.error('ERROR -- MODEL: OrthodonticsModel.checkColumnNameExists')
            throw error
        }
    }
    async readOrthodontics(data: ReadOrthodonticsInterface): Promise<ReadOrthodonticsResultInterface> {
        try {
            const values = [data.idSmPatient]
            const readOrthodonticsQueryResult: QueryResult = await this.db().query(readOrthodonticsQuery, values)
            if(this.checkSelect(readOrthodonticsQueryResult)) {
                const orthodontics = readOrthodonticsQueryResult.rows[0]
                const modelResult: ReadOrthodonticsResultInterface = {
                    success: true,
                    id: orthodontics.id,
                    examNotes: orthodontics.exam_notes,
                    softTissue: orthodontics.soft_tissue,
                    dentalExam: orthodontics.dental_exam
                }
                return modelResult
            }
            const modelResult: ReadOrthodonticsResultInterface = { success: false }
            return modelResult
        } catch (error) {
            console.error('ERROR -- MODEL: OrthodonticsModel.readOrthodontics')
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
            console.error('ERROR -- MODEL: OrthodonticsModel.updateExamNotes')
            throw error
        }
    }
    async updateOrthodontics(data: UpdateOrthodonticsInterface): Promise<boolean> {
        try {
            const values = [
                data.option,
                data.title,
                data.value,
                data.id
            ]
            const updateSmOrthodonticsResult: QueryResult = await this.db().query(/*sql*/`
                UPDATE sm_orthodontics

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
                                                    WHEN 'dentalAnomalies' = $1
                                                    THEN vals
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
            return this.checkInsert(updateSmOrthodonticsResult)
        } catch (error) {
            console.error('ERROR -- MODEL: OrthodonticsModel.updateOrthodontics')
            throw error
        }
    }
    async updateOverbiteHorizontal(data: UpdateOverbiteHorizontalInterface): Promise<boolean> {
        try {
            const values = [
                data.value,
                data.id
            ]
            const updateOverbiteHorizontalQueryResult: QueryResult = await this.db().query(updateOverbiteHorizontalQuery, values)
            return this.checkInsert(updateOverbiteHorizontalQueryResult)
        } catch (error) {
            console.error('ERROR -- MODEL: OrthodonticsModel.updateOverbiteHorizontal')
            throw error
        }
    }
    async updateOverbiteVertical(data: UpdateOverbiteVerticalInterface): Promise<boolean> {
        try {
            const values =[
                data.value,
                data.id
            ]
            const updateOverbiteVerticalQueryResult: QueryResult = await this.db().query(updateOverbiteVerticalQuery, values)
            return this.checkInsert(updateOverbiteVerticalQueryResult)
        } catch (error) {
            console.error('ERROR -- MODEL: OrthodonticsModel.updateOverbiteVertical')
            throw error
        }
    }
    async updateMiddleLine(data: UpdateMiddleLineInterface): Promise<boolean> {
        try {
            const values = [
                {
                    coincident: data.coincident,
                    mandibular: data.mandibular,
                    maxillary: data.maxillary
                },
                data.id
            ]
            const updateMiddleLineQueryResult: QueryResult = await this.db().query(updateMiddleLineQuery, values)
            return this.checkInsert(updateMiddleLineQueryResult)
        } catch (error) {
            console.error('ERROR -- MODEL: OrthodonticsModel.updateMiddleLine')
            throw error
        }
    }
}