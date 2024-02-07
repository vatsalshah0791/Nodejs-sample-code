'use strict'


import EndodonticsRepository from '../domain/Endodontics.repository'

import { UpdateDiagnosisInterface } from '../domain/interface/UpdateDiagnosis.interface'


interface Result {
    success: boolean
    statusCode: number
    message: string
}


export default class UpdateDiagnosisApplication {
    constructor(private readonly endodonticsRepository: EndodonticsRepository) {}
    async run (data: UpdateDiagnosisInterface): Promise<Result> {
        const updateDiagnosisResult = await this.endodonticsRepository.updateDiagnosis(data)
        if(!updateDiagnosisResult) {
            const response: Result = {
                success: false,
                statusCode: 500,
                message: 'Error editing the exam.'
            }
            return response
        }
        const response: Result = {
            success: true,
            statusCode: 200,
            message: 'Success'
        }
        return response
    }
}