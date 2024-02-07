'use strict'


import ClinicRepository from '../domain/Clinic.repository'

import { ReadStaffStatisticsInterface } from '../domain/interfaces/ReadStaffStatistics.interface'


interface Result {
    success: boolean
    statusCode: number
    message: string
    data?: {
        patients?: number
        doctors?: number
        collaborators?: number
    }
}


export default class ReadStaffStatisticsApplication {
    constructor(private readonly clinicRepository: ClinicRepository) {}
    async run (data: ReadStaffStatisticsInterface): Promise<Result> {
        const readStaffStatisticsResult = await this.clinicRepository.readStaffStatistics(data)
        if(!readStaffStatisticsResult.success) {
            const response: Result = {
                success: false,
                statusCode: 404,
                message: 'The requested clinic does not exist'
            }
            return response
        }
        const response: Result = {
            success: true,
            statusCode: 200,
            message: 'Success',
            data: {
                patients: readStaffStatisticsResult.patients,
                doctors: readStaffStatisticsResult.doctors,
                collaborators: readStaffStatisticsResult.collaborators
            }
        }
        return response
    }
}