'use strict'


import { QueryResult, Pool } from 'pg'

import ProviderTypeRepository from '../../domain/ProviderType.repository'

import { ReadProviderTypeResultInterface } from '../../domain/interface/ReadProviderTypes.interface'

import readProviderTypeQuery from './querys/readProviderType.query'


export default class ProviderTypeModel implements ProviderTypeRepository {
    constructor(private readonly db: () => Pool) {}
    async readProviderType(): Promise<ReadProviderTypeResultInterface[]> {
        try {
            const readProviderTypeQueryResult: QueryResult = await this.db().query(readProviderTypeQuery)
            const providerTypes = readProviderTypeQueryResult.rows.map(element => {
                const newElement: ReadProviderTypeResultInterface = {
                    id: element.id,
                    providerType: element.provider_type
                }
                return newElement
            })
            return providerTypes
        } catch (error) {
            console.error('ERROR -- MODEL: ProviderTypeModel.readProviderType')
            throw error
        }
    }
}