'use strict'


import AppPlan from '../entities/AppPlan'


export interface ReadSubscriptionInterface {
    idAccount: string
}

export interface ReadSubscriptionResultInterface {
    success: boolean
    customerId?: string
    subscriptionId?: string
    idAppPlan?: string
    clinics?: AppPlan['clinics']
    dentalChairs?: AppPlan['dentalChairs'][]
    doctors?: AppPlan['doctors']
    collaborators?: AppPlan['collaborators']
    patients?: AppPlan['patients']
}