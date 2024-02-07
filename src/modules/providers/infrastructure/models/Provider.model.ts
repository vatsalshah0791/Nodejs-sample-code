'use strict'


import { QueryResult, Pool } from 'pg'

import ProviderRepository from '../../domain/Provider.repository'

import { CheckPlanInterface } from '../../domain/interfaces/CheckPlan.interface'
import { CreateProviderInterface, CreateProviderResultInterface } from '../../domain/interfaces/CreateProvider.interface'
import { ReadProvidersInterface, ReadProvidersResultInterface } from '../../domain/interfaces/ReadProviders.interface'
import { UpdateProviderInterface } from '../../domain/interfaces/UpdateProvider.interface'
import { DeleteProviderInterface } from '../../domain/interfaces/DeleteProvider.interface'

import checkPlanTransactions from './transactions/checkPlan.transactions'
import createProviderQuery from './querys/createProvider.query'
import readProvidersQuery from './querys/readProviders.query'
import updateProviderQuery from './querys/updateProvider.query'
import deleteProviderQuery from './querys/deleteProvider.query'


export default class ProviderModel implements ProviderRepository {
    constructor(
        private readonly db: () => Pool,
        private readonly checkSelect: (param: QueryResult) => boolean,
        private readonly checkInsert: (param: QueryResult) => boolean
    ) {}
    async checkPlan(data: CheckPlanInterface): Promise<boolean> {
        try {
            const values = [data.idClinic]
            const [selectAppPlan, selectCountProviders] = checkPlanTransactions
            const selectAppPlanResult: QueryResult = await this.db().query(selectAppPlan, values)
            if(!this.checkSelect(selectAppPlanResult)) {
                return false
            }
            const selectCountProvidersResult: QueryResult = await this.db().query(selectCountProviders, values)
            const availableProviders = selectAppPlanResult.rows[0].patients
            const providersCreated = selectCountProvidersResult.rows[0].total_providers
            if(availableProviders === -1) {
                return true
            }
            if(providersCreated >= availableProviders) {
                return false
            }
            return true
        } catch (error) {
            console.error('ERROR -- MODEL: ProviderModel.checkPlan')
            throw error
        }
    }
    async createProvider(data: CreateProviderInterface): Promise<CreateProviderResultInterface> {
        try {
            const values = [
                data.title,
                data.email,
                data.fullAddress,
                data.phonePrefix,
                data.phone,
                data.website,
                data.idAppProviderType,
                data.idSmClinic
            ]
            const createProviderQueryResult: QueryResult = await this.db().query(createProviderQuery, values)
            if(this.checkInsert(createProviderQueryResult)) {
                const modelResult: CreateProviderResultInterface = {
                    success: true,
                    id: createProviderQueryResult.rows[0].id
                }
                return modelResult
            }
            const modelResult: CreateProviderResultInterface = { success: false }
            return modelResult
        } catch (error) {
            console.error('ERROR -- MODEL: ProviderModel.createProvider')
            throw error
        }
    }
    async readProviders(data: ReadProvidersInterface): Promise<ReadProvidersResultInterface[]> {
        try {
            const values = [data.idClinic]
            const readProvidersQueryResult: QueryResult = await this.db().query(readProvidersQuery, values)
            const providers = readProvidersQueryResult.rows.map(element => {
                const newElement: ReadProvidersResultInterface = {
                    id: element.id,
                    title: element.title,
                    email: element.email,
                    fullAddress: element.full_address,
                    phonePrefix: element.phone_prefix,
                    phone: element.phone,
                    website: element.website,
                    providerType: element.provider_type,
                    idAppProviderType: element.as_id_provider_type
                }
                return newElement
            })
            return providers
        } catch (error) {
            console.error('ERROR -- MODEL: ProviderModel.readProviders')
            throw error
        }
    }
    async updateProvider(data: UpdateProviderInterface): Promise<boolean> {
        try {
            const values = [
                data.title,
                data.email,
                data.fullAddress,
                data.phonePrefix,
                data.phone,
                data.website,
                data.idAppProviderType,
                data.id
            ]
            const updateProviderQueryResult: QueryResult = await this.db().query(updateProviderQuery, values)
            return this.checkInsert(updateProviderQueryResult)
        } catch (error) {
            console.error('ERROR -- MODEL: ProviderModel.updateProvider')
            throw error
        }
    }
    async deleteProvider(data: DeleteProviderInterface): Promise<boolean> {
        try {
            const values = [data.id]
            const deleteProviderQueryResult: QueryResult = await this.db().query(deleteProviderQuery, values)
            return this.checkInsert(deleteProviderQueryResult)
        } catch (error) {
            console.error('ERROR -- MODEL: ProviderModel.deleteProvider')
            throw error
        }
    }
}