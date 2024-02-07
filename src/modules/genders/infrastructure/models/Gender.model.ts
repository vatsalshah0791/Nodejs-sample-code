'use strict'


import { QueryResult, Pool } from 'pg'

import GenderRepository from '../../domain/Gender.repository'

import { ReadGendersResultInterface } from '../../domain/interfaces/RenderGenders.interface'

import readGendersQuery from './query/readGenders.query'


export default class GenderModel implements GenderRepository {
    constructor(private readonly db: () => Pool) {}
    async readGenders(): Promise<ReadGendersResultInterface[]> {
        try {
            const readGendersQueryResult: QueryResult = await this.db().query(readGendersQuery)
            const genders = readGendersQueryResult.rows.map(element => {
                const newElement: ReadGendersResultInterface = {
                    id: element.id,
                    genderName: element.gender_name
                }
                return newElement
            })
            return genders
        } catch (error) {
            console.error('ERROR -- MODEL: GenderModel.readGenders')
            throw error
        }
    }
}