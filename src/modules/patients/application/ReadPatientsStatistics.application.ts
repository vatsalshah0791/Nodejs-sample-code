'use strict'


import PatientRepository from '../domain/Patient.repository'

import { ReadPatientsStatisticsInterface } from '../domain/interfaces/ReadPatientsStatistics.interface'


interface Result {
    success: boolean
    statusCode: number,
    message: string
    data?: {
        graphPatients?: number[]
    }
}


export default class ReadPatientsStatisticsApplication {
    constructor(private readonly patientRepository: PatientRepository) {}
    async run(data: ReadPatientsStatisticsInterface): Promise<Result> {
        const readCollaboratorsResult = await this.patientRepository.readPatientsStatistics(data)
        const response: Result = {
            success: true,
            statusCode: 200,
            message: 'Success',
            data: {
                graphPatients: readCollaboratorsResult.graphPatients
            }
        }
        return response
    }
}