'use strict'


import VariableExpendsRepository from '../domain/VariableExpends.repository'

import { ReadCommissionsByDoctorInterface, ReadCommissionsByDoctorResultInterface } from '../domain/interfaces/ReadCommisionsByDoctor.interface'


interface Result {
    success: boolean
    statusCode: number
    message: string
    data?: ReadCommissionsByDoctorResultInterface[]
}


export default class ReadCommissionsByDoctorApplication {
    constructor(private readonly variableExpendsRepository: VariableExpendsRepository) {}
    async run(data: ReadCommissionsByDoctorInterface): Promise<Result> {
        const readCommissionsByDoctorResult = await this.variableExpendsRepository.readCommissionsByDoctor(data)
        const response: Result = {
            success: true,
            statusCode: 200,
            message:'Success',
            data: readCommissionsByDoctorResult
        }
        return response
    }
}