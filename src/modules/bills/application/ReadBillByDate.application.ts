'use strict'

import BillRepository from '../domain/Bill.repository'

import {
    ReadByDateInterface,
    ReadByDateResultInterface
} from '../domain/Bill.interface'

interface DTO {
    success: boolean
    statusCode: number
    message: string
    language: { refresh: boolean }
    data?: ReadByDateResultInterface[]
}

export default class ReadBillByDateApplication {
    constructor(private readonly billRepository: BillRepository) {}
    async run(data: ReadByDateInterface): Promise<DTO> {
        try {
            const readByDateResult = await this.billRepository.readByDate(data)
            const response: DTO = {
                success: true,
                statusCode: 200,
                message: 'Success',
                language: { refresh: false },
                data: readByDateResult
            }
            return response
        } catch (error) {
            console.error('ERROR -- LOGIC: bills => application => ReadByDateApplication.run')
            throw error
        }
    }
}