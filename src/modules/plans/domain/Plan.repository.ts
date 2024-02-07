'use strict'


import { ReadPlansResultInterface, ReadPlansByAdminInterface } from './interfaces/ReadPlans.interface'
import { ReadCustomerInterface, ReadCustomerResultInterface } from './interfaces/ReadCustomer.interface'
import { ReadSubscriptionInterface, ReadSubscriptionResultInterface } from './interfaces/ReadSubscription.interface'
import { ReadPlanInterface, ReadPlanResultInterface } from './interfaces/ReadPlan.interface'
import { UpdateIdCustomerInterface } from './interfaces/UpdateIdCustomer.interface'
import { UpdateSubscriptionInterface } from './interfaces/UpdateSubscription.interface'
import { VerifyPlanExpirationDateInterface } from './interfaces/VerifyPlanExpirationDate.interface'


export default interface PlanRepository {

    readPlans(): Promise<ReadPlansResultInterface[]>

    readPlansByAdmin(data: ReadPlansByAdminInterface): Promise<ReadPlansResultInterface[]>

    readCustomer(data: ReadCustomerInterface): Promise<ReadCustomerResultInterface>

    readSubscription(data: ReadSubscriptionInterface): Promise<ReadSubscriptionResultInterface>

    readPlan(data: ReadPlanInterface): Promise<ReadPlanResultInterface>

    updateIdCustomer(data: UpdateIdCustomerInterface): Promise<boolean>

    updateSubscription(data: UpdateSubscriptionInterface): Promise<boolean>

    verifyPlanExpirationDateAdmin(data: VerifyPlanExpirationDateInterface): Promise<boolean>

    verifyPlanExpirationDateCollaborator(data: VerifyPlanExpirationDateInterface): Promise<boolean>

}