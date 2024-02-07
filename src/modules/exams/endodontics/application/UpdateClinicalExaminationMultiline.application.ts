'use strict'


import EndodonticsRepository from '../domain/Endodontics.repository'

import { UpdateClinicalExaminationMultilineInterface } from '../domain/interface/UpdateClinicalExaminationMultiline.interface'


interface Result {
    success: boolean
    statusCode: number
    message: string
}


export default class UpdateClinicalExaminationMultilineApplication {
    constructor(private readonly endodonticsRepository: EndodonticsRepository) {}
    async run (data: UpdateClinicalExaminationMultilineInterface): Promise<Result> {
        const updateClinicalExaminationMultilineResult = await this.endodonticsRepository.updateClinicalExaminationMultiline(data)
        if(!updateClinicalExaminationMultilineResult) {
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