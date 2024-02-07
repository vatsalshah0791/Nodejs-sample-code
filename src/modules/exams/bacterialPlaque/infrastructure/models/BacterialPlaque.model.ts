'use strict'


import { QueryResult, Pool } from 'pg'

import BacterialPlaqueRepository from '../../domain/BacterialPlaque.repository'

import { CheckColumnNameExists } from '../../domain/interface/CheckColumnNameExists.interface'
import { ReadBacterialPlaqueInterface, ReadBacterialPlaqueResultInterface } from '../../domain/interface/ReadBacterialPlaque.interface'
import { UpdateIsAdultInterface } from '../../domain/interface/UpdateIsAdult.interface'
import { UpdateBacterialPlaqueInterface } from '../../domain/interface/UpdateBacterialPlaque.interface'

import checkColumnNameExistsQuery from './query/checkColumnNameExists.query'
import readBacterialPlaqueQuery from './query/readBacterialPlaque.query'
import updateIsAdultBacterialPlaqueQuery from './query/updateIsAdult.query'


export default class BacterialPlaqueModel implements BacterialPlaqueRepository {
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
            console.error('ERROR -- MODEL: BacterialPlaqueModel.checkColumnNameExists')
            throw error
        }
    }
    async readBacterialPlaque(data: ReadBacterialPlaqueInterface): Promise<ReadBacterialPlaqueResultInterface> {
        try {
            const values = [data.idSmPatient]
            const readBacterialPlaqueQueryResult: QueryResult = await this.db().query(readBacterialPlaqueQuery, values)
            if(this.checkSelect(readBacterialPlaqueQueryResult)) {
                const bacterialPlaque = readBacterialPlaqueQueryResult.rows[0]
                const modelResult: ReadBacterialPlaqueResultInterface = {
                    success: true,
                    id: bacterialPlaque.id,
                    isAdult: bacterialPlaque.is_adult,
                    rightUpperQuadrant: bacterialPlaque.right_upper_quadrant,
                    upperLeftQuadrant: bacterialPlaque.upper_left_quadrant,
                    rightLowerQuadrant: bacterialPlaque.right_lower_quadrant,
                    lowerLeftQuadrant: bacterialPlaque.lower_left_quadrant
                }
                return modelResult
            }
            const modelResult: ReadBacterialPlaqueResultInterface = { success: false }
            return modelResult
        } catch (error) {
            console.error('ERROR -- MODEL: BacterialPlaqueModel.readBacterialPlaque')
            throw error
        }
    }
    async updateIsAdult(data: UpdateIsAdultInterface): Promise<boolean> {
        try {
            const values = [
                data.isAdult,
                data.id
            ]
            const updateIsAdultBacterialPlaqueQueryResult: QueryResult = await this.db().query(updateIsAdultBacterialPlaqueQuery, values)
            return this.checkInsert(updateIsAdultBacterialPlaqueQueryResult)
        } catch (error) {
            console.error('ERROR -- MODEL: BacterialPlaqueModel.updateIsAdult')
            throw error
        }
    }
    async updateBacterialPlaque(data: UpdateBacterialPlaqueInterface): Promise<boolean> {
        try {
            const values = [
                data.option,
                data.teeth,
                data.id
            ]
            const updateSmRecordResult: QueryResult = await this.db().query(/*sql*/`
                UPDATE sm_bacterial_plaque

                SET ${data.key} = (
                    SELECT jsonb_set(
                        ${data.key},
                        '{data}',
                        COALESCE(
                            jsonb_agg(
                                CASE
                                    WHEN item->>'title' = $1
                                    THEN jsonb_set(item, '{teeth}', $2::jsonb)
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
            console.error('ERROR -- MODEL: BacterialPlaqueModel.updateBacterialPlaque')
            throw error
        }
    }
}