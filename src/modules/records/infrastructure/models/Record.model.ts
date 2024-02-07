'use strict'


import { QueryResult, Pool } from 'pg'

import RecordRepository from '../../domain/Record.repository'

import { ReadRecordInterface, ReadRecordResultInterface } from '../../domain/interfaces/ReadRecord.interface'
import { UpdateMedicalHistoryNotesInterface } from '../../domain/interfaces/UpdateMedicalHistoryNotes.interface'
import { UpdateDentalHistoryNotesInterface } from '../../domain/interfaces/UpdateDentalHistoryNotes.interface'
import { CheckColumnNameExists } from '../../domain/interfaces/CheckColumnNameExists.interface'
import { UpdateRecordInterface } from '../../domain/interfaces/UpdateRecord.interface'

import readRecordQuery from './querys/readRecord.query'
import updateMedicalHistoryNotesQuery from './querys/updateMedicalHistoryNotes.query'
import updateDentalHistoryNotesQuery from './querys/updateDentalHistoryNotes.query'
import checkColumnNameExistsQuery from './querys/checkColumnNameExists.query'


export default class RecordModel implements RecordRepository {
    constructor(
        private readonly db: () => Pool,
        private readonly checkSelect: (param: QueryResult) => boolean,
        private readonly checkInsert: (param: QueryResult) => boolean
    ) {}
    async readRecord(data: ReadRecordInterface): Promise<ReadRecordResultInterface> {
        try {
            const values = [data.idSmPatient]
            const readRecordQueryResult: QueryResult = await this.db().query(readRecordQuery, values)
            if(this.checkSelect(readRecordQueryResult)) {
                const record = readRecordQueryResult.rows[0]
                const modelResult: ReadRecordResultInterface = {
                    success: true,
                    id: record.id,
                    medicalHistoryNotes: record.medical_history_notes,
                    dentalHistoryNotes: record.dental_history_notes,
                    allergies: { key: 'allergies', ...record.allergies },
                    heartProblems: { key: 'heart_problems', ...record.heart_problems },
                    medicalRecord: { key: 'medical_record', ...record.medical_record },
                    sensitivity: { key: 'sensitivity', ...record.sensitivity },
                    oralExam: { key: 'oral_exam', ...record.oral_exam },
                    ailments: { key: 'ailments', ...record.ailments }
                }
                return modelResult
            }
            const modelResult: ReadRecordResultInterface = { success: false }
            return modelResult
        } catch (error) {
            console.error('ERROR -- MODEL: RecordModel.readRecord')
            throw error
        }
    }
    async updateMedicalHistoryNotes(data: UpdateMedicalHistoryNotesInterface): Promise<boolean> {
        try {
            const values = [
                data.note,
                data.id
            ]
            const updateMedicalHistoryNotesQueryResult: QueryResult = await this.db().query(updateMedicalHistoryNotesQuery, values)
            return this.checkInsert(updateMedicalHistoryNotesQueryResult)
        } catch (error) {
            console.error('ERROR -- MODEL: RecordModel.updateMedicalHistoryNotes')
            throw error
        }
    }
    async updateDentalHistoryNotes(data: UpdateDentalHistoryNotesInterface): Promise<boolean> {
        try {
            const values = [
                data.note,
                data.id
            ]
            const updateDentalHistoryNotesQueryResult: QueryResult = await this.db().query(updateDentalHistoryNotesQuery, values)
            return this.checkInsert(updateDentalHistoryNotesQueryResult)
        } catch (error) {
            console.error('ERROR -- MODEL: RecordModel.updateDentalHistoryNotes')
            throw error
        }
    }
    async checkColumnNameExists(data: CheckColumnNameExists): Promise<boolean> {
        try {
            const checkColumnNameExistsQueryResult: QueryResult = await this.db().query(checkColumnNameExistsQuery)
            const allowedColumns = checkColumnNameExistsQueryResult.rows.map(element => element.column_name)
            if(allowedColumns.includes(data.key)) {
                return true
            }
            return false
        } catch (error) {
            console.error('ERROR -- MODEL: RecordModel.checkColumnNameExists')
            throw error
        }
    }
    async updateRecord(data: UpdateRecordInterface): Promise<boolean> {
        try {
            const values = [
                data.option,
                data.value,
                data.id
            ]
            const updateSmRecordResult: QueryResult = await this.db().query(/*sql*/`
                UPDATE sm_record

                SET ${data.key} = (
                    SELECT jsonb_set(
                        ${data.key},
                        '{data}',
                        COALESCE(
                            jsonb_agg(
                                CASE
                                    WHEN item->>'title' = $1
                                    THEN jsonb_set(item, '{value}', $2::jsonb)
                                    ELSE item
                                END
                            ),
                            '[]'::jsonb
                        )
                    )
                    FROM jsonb_array_elements(${data.key}->'data') AS item
                )

                WHERE id = $3
                AND deleted_at IS NULL
            `, values)
            return this.checkInsert(updateSmRecordResult)
        } catch (error) {
            console.error('ERROR -- MODEL: RecordModel.updateRecord')
            throw error
        }
    }
}