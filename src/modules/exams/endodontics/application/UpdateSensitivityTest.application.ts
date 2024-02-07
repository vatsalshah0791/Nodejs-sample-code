'use strict'


import EndodonticsRepository from '../domain/Endodontics.repository'

import { UpdateSensitivityTestInterface } from '../domain/interface/UpdateSensitivityTest.interface'


interface Result {
    success: boolean
    statusCode: number
    message: string
}


export default class UpdateSensitivityTestApplication {
    constructor(private readonly endodonticsRepository: EndodonticsRepository) {}
    async run (data: UpdateSensitivityTestInterface): Promise<Result> {
        const updateSensitivityTestResult = await this.endodonticsRepository.updateSensitivityTest(data)
        if(!updateSensitivityTestResult) {
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