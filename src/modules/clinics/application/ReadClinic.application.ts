'use strict'


import ClinicRepository from '../domain/Clinic.repository'

import { ReadClinicInterface } from '../domain/interfaces/ReadClinic.interface'


interface Result {
    success: boolean
    statusCode: number
    message: string
    data?: {
        id?: string
        clinicName?: string
        email?: string
        phonePrefix?: string
        phone?: string
        fullAddress?: string
        logo?: string | null
        idCountry?: string
        idTimeZone?: string
        idCurrency?: string
    }
}


export default class ReadClinicApplication {
    constructor(
        private readonly clinicRepository: ClinicRepository,
        private readonly getObjectBase64: (Key: string | null | undefined) => Promise<string | null>
    ) {}
    async run (data: ReadClinicInterface): Promise<Result> {
        const readClinicResult = await this.clinicRepository.readClinic(data)
        if(!readClinicResult.success) {
            const response: Result = {
                success: false,
                statusCode: 404,
                message: 'The requested clinic does not exist'
            }
            return response
        }
        const logo = await this.getObjectBase64(readClinicResult.logo)
        const response: Result = {
            success: true,
            statusCode: 200,
            message: 'Success',
            data: {
                id: readClinicResult.id,
                clinicName: readClinicResult.clinicName,
                email: readClinicResult.email,
                phonePrefix: readClinicResult.phonePrefix,
                phone: readClinicResult.phone,
                fullAddress: readClinicResult.fullAddress,
                logo,
                idCountry: readClinicResult.idAppCountry,
                idTimeZone: readClinicResult.idAppTimeZone,
                idCurrency: readClinicResult.idAppCurrency
            }
        }
        return response
    }
}