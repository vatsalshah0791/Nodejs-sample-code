'use strict'


import PatientRepository from '../domain/Patient.repository'

import { ReadPatientsInterface, ReadPatientsResultInterface } from '../domain/interfaces/ReadPatients.interface'


interface Result {
    success: boolean
    statusCode: number
    message: string
    data?: ReadPatientsResultInterface[]
}


export default class ReadPatientsApplication {
    constructor(
        private readonly patientRepository: PatientRepository,
        private readonly getObjectBase64: (Key: string | null | undefined) => Promise<string | null>
    ) {}
    async run(data: ReadPatientsInterface): Promise<Result> {
        const readPatientsResult = await this.patientRepository.readPatients(data)
        const mapReadPatientsResult = readPatientsResult.map(async patient => {
            try {
                patient.photo = await this.getObjectBase64(patient.photo)
                return patient
            } catch (error) {
                console.error(error)
                patient.photo = null
                return patient
            }
        })
        const patients = await Promise.all(mapReadPatientsResult)
        const response: Result = {
            success: true,
            statusCode: 200,
            message: 'Success',
            data: patients
        }
        return response
    }
}