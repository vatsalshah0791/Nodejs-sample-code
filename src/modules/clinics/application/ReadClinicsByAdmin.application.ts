'use strict'


import ClinicRepository from '../domain/Clinic.repository'

import { ReadClinicsInterface, ReadClinicsResultInterface } from '../domain/interfaces/ReadClinics.interface'


interface Result {
    success: boolean
    statusCode: number
    message: string
    data?: ReadClinicsResultInterface[]
}


export default class ReadClinicsByAdminApplication {
    constructor(
        private readonly clinicRepository: ClinicRepository,
        private readonly getObjectBase64: (Key: string | null | undefined) => Promise<string | null>
    ) {}
    async run (data: ReadClinicsInterface): Promise<Result> {
        const readClinicsByAdminResult = await this.clinicRepository.readClinicsByAdmin({ idAccount: data.idAccount })
        const mapReadClinicsByAdminResult = readClinicsByAdminResult.map(async clinic => {
            try {
                clinic.logo = await this.getObjectBase64(clinic.logo)
                if(clinic.appointment?.photo) {
                    clinic.appointment.photo = await this.getObjectBase64(clinic.appointment.photo)
                }
                return clinic
            } catch (error) {
                console.error(error)
                clinic.logo = null
                return clinic
            }
        })
        const clinics = await Promise.all(mapReadClinicsByAdminResult)
        const response: Result = {
            success: true,
            statusCode: 200,
            message: 'Success',
            data: clinics
        }
        return response
    }
}