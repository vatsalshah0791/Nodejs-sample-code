'use strict'


import { QueryResult, Pool, PoolClient } from 'pg'

import PlanRepository from '../../domain/Plan.repository'

import { ReadPlansResultInterface, ReadPlansByAdminInterface } from '../../domain/interfaces/ReadPlans.interface'
import { ReadCustomerInterface, ReadCustomerResultInterface } from '../../domain/interfaces/ReadCustomer.interface'
import { UpdateIdCustomerInterface } from '../../domain/interfaces/UpdateIdCustomer.interface'
import { ReadPlanInterface, ReadPlanResultInterface } from '../../domain/interfaces/ReadPlan.interface'
import { ReadSubscriptionInterface, ReadSubscriptionResultInterface } from '../../domain/interfaces/ReadSubscription.interface'
import { UpdateSubscriptionInterface } from '../../domain/interfaces/UpdateSubscription.interface'
import { VerifyPlanExpirationDateInterface } from '../../domain/interfaces/VerifyPlanExpirationDate.interface'

import readPlansQuery from './querys/readPlans.query'
import readPlansByAdminQuery from './querys/readPlansByAdmin.query'
import readCustomerQuery from './querys/readCustomer.query'
import updateIdCustomerQuery from './querys/updateIdCustomer.query'
import readPlanQuery from './querys/readPlan.query'
import readSubscriptionTransactions from './transactions/readSubscription.transactions'
import updateSubscriptionQuery from './querys/updateSubscription.query'
import verifyPlanExpirationDateAdminQuery from './querys/verifyPlanExpirationDateAdmin.query'
import verifyPlanExpirationDateCollaboratorQuery from './querys/verifyPlanExpirationDateCollaborator.query'


export default class PlanModel implements PlanRepository {
    constructor(
        private readonly db: () => Pool,
        private readonly checkSelect: (param: QueryResult) => boolean,
        private readonly checkInsert: (param: QueryResult) => boolean
    ) {}
    async readPlans(): Promise<ReadPlansResultInterface[]> {
        try {
            const selectAppPlanResult: QueryResult = await this.db().query(readPlansQuery)
            const plans = selectAppPlanResult.rows.map(element => {
                const newElement: ReadPlansResultInterface = {
                    id: element.id,
                    planCode: element.plan_code,
                    clinics: element.clinics,
                    dentalChairs: element.dental_chairs,
                    doctors: element.doctors,
                    collaborators: element.collaborators,
                    patients: element.patients
                }
                return newElement
            })
            return plans
        } catch (error) {
            console.error('ERROR -- MODEL: PlanModel.readPlans')
            throw error
        }
    }
    async readPlansByAdmin(data: ReadPlansByAdminInterface): Promise<ReadPlansResultInterface[]> {
        try {
            const values = [data.idAccount]
            const selectAppPlanResult: QueryResult = await this.db().query(readPlansByAdminQuery, values)
            const plans = selectAppPlanResult.rows.map(element => {
                const newElement: ReadPlansResultInterface = {
                    id: element.id,
                    planCode: element.plan_code,
                    clinics: element.clinics,
                    dentalChairs: element.dental_chairs,
                    doctors: element.doctors,
                    collaborators: element.collaborators,
                    patients: element.patients,
                    isActive: element.is_active
                }
                return newElement
            })
            return plans
        } catch (error) {
            console.error('ERROR -- MODEL: PlanModel.readPlansByAdmin')
            throw error
        }
    }
    async readCustomer(data: ReadCustomerInterface): Promise<ReadCustomerResultInterface>{
        try {
            const values = [data.idAccount]
            const readCustomerQueryResult: QueryResult = await this.db().query(readCustomerQuery, values)
            if(this.checkSelect(readCustomerQueryResult)) {
                const customer = readCustomerQueryResult.rows[0]
                const modelResult: ReadCustomerResultInterface = {
                    success: true,
                    customerId: customer.customer_id,
                    email: customer.email
                }
                return modelResult
            }
            const modelResult: ReadCustomerResultInterface = { success: false }
            return modelResult
        } catch (error) {
            console.error('ERROR -- MODEL: PlanModel.readCustomer')
            throw error
        }
    }
    async readSubscription(data: ReadSubscriptionInterface): Promise<ReadSubscriptionResultInterface> {
        const client: PoolClient = await this.db().connect()
        try {
            const [readAdminQuery, countClinicsQuery, countDentalChairsQuery, countCollaboratorsQuery, countPatientsQuery] = readSubscriptionTransactions
            await client.query('BEGIN')
            const values = [data.idAccount]
            const readAdminQueryResult: QueryResult = await client.query(readAdminQuery, values)
            if(this.checkSelect(readAdminQueryResult)) {
                const smAdmin = readAdminQueryResult.rows[0]
                const countClinicsQueryResult: QueryResult = await client.query(countClinicsQuery, [smAdmin.id])
                const countDentalChairsQueryResult: QueryResult = await client.query(countDentalChairsQuery, [smAdmin.id])
                const countDoctorsQueryResult: QueryResult = await client.query(countCollaboratorsQuery, [smAdmin.id, [3]])
                const countCollaboratorsQueryResult: QueryResult = await client.query(countCollaboratorsQuery, [smAdmin.id, [4, 5, 6, 7]])
                const countPatientsQueryResult: QueryResult = await client.query(countPatientsQuery, [smAdmin.id])
                await client.query('COMMIT')
                const modelResult: ReadSubscriptionResultInterface = {
                    success: true,
                    customerId: smAdmin.customer_id,
                    subscriptionId: smAdmin.subscription_id,
                    idAppPlan: smAdmin.id_app_plan,
                    clinics: Number(countClinicsQueryResult.rows[0].clinics_created),
                    dentalChairs: countDentalChairsQueryResult.rows.map(element => Number(element.dental_chairs_created)),
                    doctors: Number(countDoctorsQueryResult.rows[0].collaborators_created),
                    collaborators: Number(countCollaboratorsQueryResult.rows[0].collaborators_created),
                    patients: Number(countPatientsQueryResult.rows[0].patients_created)
                }
                return modelResult
            }
            await client.query('COMMIT')
            const modelResult: ReadSubscriptionResultInterface = { success: false }
            return modelResult
        } catch (error) {
            await client.query('ROLLBACK')
            console.error('ERROR -- MODEL: PlanModel.readSubscription')
            throw error
        }
        finally {
            client.release()
        }
    }
    async readPlan(data: ReadPlanInterface): Promise<ReadPlanResultInterface> {
        try {
            const values = [data.id]
            const readPlanQueryResult: QueryResult = await this.db().query(readPlanQuery, values)
            if(this.checkSelect(readPlanQueryResult)) {
                const plan = readPlanQueryResult.rows[0]
                const modelResult: ReadPlanResultInterface = {
                    success: true,
                    planCode: plan.plan_code,
                    clinics: plan.clinics,
                    dentalChairs: plan.dental_chairs,
                    doctors: plan.doctors,
                    collaborators: plan.collaborators,
                    patients: plan.patients
                }
                return modelResult
            }
            const modelResult: ReadPlanResultInterface = { success: false }
            return modelResult
        } catch (error) {
            console.error('ERROR -- MODEL: PlanModel.readPlan')
            throw error
        }
    }
    async updateIdCustomer(data: UpdateIdCustomerInterface): Promise<boolean> {
        try {
            const values = [
                data.customerId,
                data.idAccount
            ]
            const updateIdCustomerQueryResult: QueryResult = await this.db().query(updateIdCustomerQuery, values)
            return this.checkInsert(updateIdCustomerQueryResult)
        } catch (error) {
            console.error('ERROR -- MODEL: PlanModel.updateIdCustomer')
            throw error
        }
    }
    async updateSubscription(data: UpdateSubscriptionInterface): Promise<boolean> {
        try {
            const values = [
                data.subscriptionId,
                data.idAppPlan,
                data.idAccount
            ]
            const updateSubscriptionQueryResult: QueryResult = await this.db().query(updateSubscriptionQuery, values)
            return this.checkInsert(updateSubscriptionQueryResult)
        } catch (error) {
            console.error('ERROR -- MODEL: PlanModel.updateSubscription')
            throw error
        }
    }
    async verifyPlanExpirationDateAdmin(data: VerifyPlanExpirationDateInterface): Promise<boolean> {
        try {
            const values = [data.idAccount]
            const verifyPlanExpirationDateAdminQueryResult: QueryResult = await this.db().query(verifyPlanExpirationDateAdminQuery, values)
            return this.checkSelect(verifyPlanExpirationDateAdminQueryResult)
        } catch (error) {
            console.error('ERROR -- MODEL: PlanModel.verifyPlanExpirationDateAdmin')
            throw error
        }
    }
    async verifyPlanExpirationDateCollaborator(data: VerifyPlanExpirationDateInterface): Promise<boolean> {
        try {
            const values = [data.idAccount]
            const verifyPlanExpirationDateCollaboratorQueryResult: QueryResult = await this.db().query(verifyPlanExpirationDateCollaboratorQuery, values)
            return this.checkSelect(verifyPlanExpirationDateCollaboratorQueryResult)
        } catch (error) {
            console.error('ERROR -- MODEL: PlanModel.verifyPlanExpirationDateCollaborator')
            throw error
        }
    }
}