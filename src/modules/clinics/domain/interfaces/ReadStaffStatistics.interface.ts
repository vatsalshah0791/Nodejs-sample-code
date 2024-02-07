'use strict'


import SmClinic from '../entities/SmClinic'


export interface ReadStaffStatisticsInterface {
    id: SmClinic['id']
}

export interface ReadStaffStatisticsResultInterface {
    success: boolean
    patients?: number
    doctors?: number
    collaborators?: number
}