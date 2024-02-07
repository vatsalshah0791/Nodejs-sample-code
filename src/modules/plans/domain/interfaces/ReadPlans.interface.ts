'use strict'


import AppPlan from '../entities/AppPlan'


export interface ReadPlansByAdminInterface {
    idAccount: string
}

export interface ReadPlansResultInterface {
    id: AppPlan['id']
    planCode: AppPlan['planCode']
    clinics: AppPlan['clinics']
    dentalChairs: AppPlan['dentalChairs']
    doctors: AppPlan['doctors']
    collaborators: AppPlan['collaborators']
    patients: AppPlan['patients']
    isActive?: boolean
}