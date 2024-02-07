'use strict'


import { QueryResult, Pool } from 'pg'

import EndodonticsRepository from '../../domain/Endodontics.repository'

import { ReadEndodonticsInterface, ReadEndodonticsResultInterface } from '../../domain/interface/ReadEndodontics.interface'
import { ReadEndodonticsTeethInterface, ReadEndodonticsTeethResultInterface } from '../../domain/interface/ReadEndodonticsTeeth.interface'
import { UpdateExamNotesInterface } from '../../domain/interface/UpdateExamNotes.interface'
import { UpdatePainInterface } from '../../domain/interface/UpdatePain.interface'
import { UpdateClinicalExaminationInterface } from '../../domain/interface/UpdateClinicalExamination.interface'
import { UpdateClinicalExaminationMultilineInterface } from '../../domain/interface/UpdateClinicalExaminationMultiline.interface'
import { UpdateXRaysInterface } from '../../domain/interface/UpdateXRays.interface'
import { UpdateSensitivityTestInterface } from '../../domain/interface/UpdateSensitivityTest.interface'
import { UpdateDiagnosisInterface } from '../../domain/interface/UpdateDiagnosis.interface'
import { UpdateDuctsInterface } from '../../domain/interface/UpdateDucts.interface'


import readEndodonticsQuery from './querys/readEndodontics.query'
import readEndodonticsTeethQuery from './querys/readEndodonticsTeeth.query'
import updateExamNotesQuery from './querys/updateExamNotes.query'
import updatePainQuery from './querys/updatePain.query'
import updateClinicalExaminationQuery from './querys/updateClinicalExamination.query'
import updateClinicalExaminationMultilineQuery from './querys/updateClinicalExaminationMultiline.query'
import updateXRaysQuery from './querys/updateXRays.query'
import updateSensitivityTestQuery from './querys/updateSensitivityTest.query'
import updateDiagnosisQuery from './querys/updateDiagnosis.query'


export default class EndodonticsModel implements EndodonticsRepository {
    constructor(
        private readonly db: () => Pool,
        private readonly checkSelect: (param: QueryResult) => boolean,
        private readonly checkInsert: (param: QueryResult) => boolean
    ) {}
    async readEndodontics(data: ReadEndodonticsInterface): Promise<ReadEndodonticsResultInterface> {
        try {
            const values = [data.idSmPatient]
            const readEndodonticsQueryResult: QueryResult = await this.db().query(readEndodonticsQuery, values)
            if(this.checkSelect(readEndodonticsQueryResult)) {
                const endodontics = readEndodonticsQueryResult.rows[0]
                const modelResult: ReadEndodonticsResultInterface = {
                    success: true,
                    id: endodontics.id,
                    examNotes: endodontics.exam_notes
                }
                return modelResult
            }
            const modelResult: ReadEndodonticsResultInterface = { success: false }
            return modelResult
        } catch (error) {
            console.error('ERROR -- MODEL: EndodonticsModel.readEndodontics')
            throw error
        }
    }
    async readEndodonticsTeeth(data: ReadEndodonticsTeethInterface): Promise<ReadEndodonticsTeethResultInterface> {
        try {
            const values = [
                data.idSmPatient,
                data.teeth
            ]
            const readEndodonticsTeethQueryResult: QueryResult = await this.db().query(readEndodonticsTeethQuery, values)
            if(this.checkSelect(readEndodonticsTeethQueryResult)) {
                const endodontics = readEndodonticsTeethQueryResult.rows[0]
                const modelResult: ReadEndodonticsTeethResultInterface = {
                    success: true,
                    id: endodontics.id,
                    pain: endodontics.pain,
                    clinicalExamination: endodontics.clinical_examination,
                    xRays: endodontics.x_rays,
                    sensitivityTest: endodontics.sensitivity_test,
                    diagnosis: endodontics.diagnosis,
                    ducts: endodontics.ducts
                }
                return modelResult
            }
            const modelResult: ReadEndodonticsTeethResultInterface = { success: false }
            return modelResult
        } catch (error) {
            console.error('ERROR -- MODEL: EndodonticsModel.readEndodonticsTeeth')
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
            console.error('ERROR -- MODEL: EndodonticsModel.updateExamNotes')
            throw error
        }
    }
    async updatePain(data: UpdatePainInterface): Promise<boolean> {
        try {
            const values = [
                data.option,
                data.title,
                data.value,
                data.id
            ]
            const updatePainQueryResult: QueryResult = await this.db().query(updatePainQuery, values)
            return this.checkInsert(updatePainQueryResult)
        } catch (error) {
            console.error('ERROR -- MODEL: EndodonticsModel.updatePain')
            throw error
        }
    }
    async updateClinicalExamination(data: UpdateClinicalExaminationInterface): Promise<boolean> {
        try {
            const values = [
                data.option,
                data.value,
                data.id
            ]
            const updateClinicalExaminationQueryResult: QueryResult = await this.db().query(updateClinicalExaminationQuery, values)
            return this.checkInsert(updateClinicalExaminationQueryResult)
        } catch (error) {
            console.error('ERROR -- MODEL: EndodonticsModel.updateClinicalExamination')
            throw error
        }
    }
    async updateClinicalExaminationMultiline(data: UpdateClinicalExaminationMultilineInterface): Promise<boolean> {
        try {
            const values = [
                data.option,
                data.title,
                data.value,
                data.id
            ]
            const updateClinicalExaminationMultilineQueryResult: QueryResult = await this.db().query(updateClinicalExaminationMultilineQuery, values)
            return this.checkInsert(updateClinicalExaminationMultilineQueryResult)
        } catch (error) {
            console.error('ERROR -- MODEL: EndodonticsModel.updateClinicalExaminationMultiline')
            throw error
        }
    }
    async updateXRays(data: UpdateXRaysInterface): Promise<boolean> {
        try {
            const values = [
                data.option,
                data.title,
                data.value,
                data.id
            ]
            const updateXRaysQueryResult: QueryResult = await this.db().query(updateXRaysQuery, values)
            return this.checkInsert(updateXRaysQueryResult)
        } catch (error) {
            console.error('ERROR -- MODEL: EndodonticsModel.updateXRays')
            throw error
        }
    }
    async updateSensitivityTest(data: UpdateSensitivityTestInterface): Promise<boolean> {
        try {
            const values = [
                data.option,
                data.value,
                data.id
            ]
            const updateSensitivityTestQueryResult: QueryResult = await this.db().query(updateSensitivityTestQuery, values)
            return this.checkInsert(updateSensitivityTestQueryResult)
        } catch (error) {
            console.error('ERROR -- MODEL: EndodonticsModel.updateSensitivityTest')
            throw error
        }
    }
    async updateDiagnosis(data: UpdateDiagnosisInterface): Promise<boolean> {
        try {
            const values = [
                data.option,
                data.value,
                data.id
            ]
            const updateDiagnosisQueryResult: QueryResult = await this.db().query(updateDiagnosisQuery, values)
            return this.checkInsert(updateDiagnosisQueryResult)
        } catch (error) {
            console.error('ERROR -- MODEL: EndodonticsModel.updateDiagnosis')
            throw error
        }
    }
    async updateDucts(data: UpdateDuctsInterface): Promise<boolean> {
        try {
            const values = [
                data.option,
                data.id
            ]
            const updateDuctsQueryResult: QueryResult = await this.db().query(/*sql*/`
                UPDATE sm_endodontics_teeth

                SET ducts = (
                    SELECT jsonb_set(
                        ducts,
                        '{data}',
                        COALESCE(
                            jsonb_agg(
                                CASE
                                    WHEN item->>'title' = $1
                                    THEN jsonb_set(
                                        jsonb_set(item, '{length}', '"${data.length}"'),
                                        '{instrumentation}', '"${data.instrumentation}"'
                                    )
                                    ELSE item
                                END
                            ),
                            '[]'::jsonb
                        )
                    )
                    FROM jsonb_array_elements(ducts->'data') AS item
                )

                WHERE id = $2
                AND deleted_at IS NULL
            `, values)
            return this.checkInsert(updateDuctsQueryResult)
        } catch (error) {
            console.error('ERROR -- MODEL: EndodonticsModel.updateDucts')
            throw error
        }
    }
}