'use strict'

import BillRepository from '../domain/Bill.repository'

import {
    ReadBillInterface,
    ReadBillResultInterface
} from '../domain/Bill.interface'

interface DTO {
    success: boolean
    statusCode: number
    message: string
    language: { refresh: boolean }
    data?: ReadBillResultInterface
}

export default class ReadBillApplication {
    constructor(private readonly billRepository: BillRepository) {}
    async run(data: ReadBillInterface): Promise<DTO> {
        try {
            const readBillResult = await this.billRepository.readBill(data)
            const response: DTO = {
                success: true,
                statusCode: 200,
                message: 'Success',
                language: { refresh: false },
                data: readBillResult
            }
            return response
        } catch (error) {
            console.error('ERROR -- LOGIC: bills => application => ReadBillApplication.run')
            throw error
        }
    }
}