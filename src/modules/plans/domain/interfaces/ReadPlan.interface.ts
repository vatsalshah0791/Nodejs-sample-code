'use strict'


import AppPlan from '../entities/AppPlan'


export interface ReadPlanInterface {
    id: AppPlan['id']
}

export interface ReadPlanResultInterface {
    success: boolean
    planCode?: AppPlan['planCode']
    clinics?: AppPlan['clinics']
    dentalChairs?: AppPlan['dentalChairs']
    doctors?: AppPlan['doctors']
    collaborators?: AppPlan['collaborators']
    patients?: AppPlan['patients']
}