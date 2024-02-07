'use strict'


import EndodonticsRepository from '../domain/Endodontics.repository'

import { UpdateClinicalExaminationInterface } from '../domain/interface/UpdateClinicalExamination.interface'


interface Result {
    success: boolean
    statusCode: number
    message: string
}


export default class UpdateClinicalExaminationApplication {
    constructor(private readonly endodonticsRepository: EndodonticsRepository) {}
    async run (data: UpdateClinicalExaminationInterface): Promise<Result> {
        const updateClinicalExaminationResult = await this.endodonticsRepository.updateClinicalExamination(data)
        if(!updateClinicalExaminationResult) {
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