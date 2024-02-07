'use strict'


import PatientRepository from '../domain/Patient.repository'

import { ReadPatientInterface } from '../domain/interfaces/ReadPatient.interface'


interface Result {
    success: boolean
    statusCode: number
    message: string
    data?: {
        id?: string
        firstName?: string
        lastName?: string
        username?: string
        photo?: string | null
        email?: string
        phonePrefix?: string
        phone?: string
        fullAddress?: string
        workplace?: string
        recommendedBy?: string | null
        birthDate?: Date
        emergencyPhonePrefix?: string
        emergencyPhone?: string
        emergencyName?: string
        createdAt?: Date
        gender?: string
        idGender?: string
        country?: string
        idCountry?: string
        doctorName?: string
        doctorUsername?: string
        idCollaborator?: string
        idClinic?: string
    }
}


export default class ReadPatientApplication {
    constructor(
        private readonly patientRepository: PatientRepository,
        private readonly getObjectBase64: (Key: string | null | undefined) => Promise<string | null>
    ) {}
    async run(data: ReadPatientInterface): Promise<Result> {
        const readPatientResult = await this.patientRepository.readPatient(data)
        if(!readPatientResult.success) {
            const response: Result = {
                success: false,
                statusCode: 400,
                message: 'The patient does not exist'
            }
            return response
        }
        const photo = await this.getObjectBase64(readPatientResult.photo)
        const response: Result = {
            success: true,
            statusCode: 200,
            message: 'Success',
            data: {
                id: readPatientResult.id,
                firstName: readPatientResult.firstName,
                lastName: readPatientResult.lastName,
                username: readPatientResult.username,
                photo,
                email: readPatientResult.email,
                phonePrefix: readPatientResult.phonePrefix,
                phone: readPatientResult.phone,
                fullAddress: readPatientResult.fullAddress,
                workplace: readPatientResult.workplace,
                recommendedBy: readPatientResult.recommendedBy,
                birthDate: readPatientResult.birthDate,
                emergencyPhonePrefix: readPatientResult.emergencyPhonePrefix,
                emergencyPhone: readPatientResult.emergencyPhone,
                emergencyName: readPatientResult.emergencyName,
                createdAt: readPatientResult.createdAt,
                gender: readPatientResult.gender,
                idGender: readPatientResult.idAppGender,
                country: readPatientResult.country,
                idCountry: readPatientResult.idAppCountry,
                doctorName: readPatientResult.doctorName,
                doctorUsername: readPatientResult.doctorUsername,
                idCollaborator: readPatientResult.idSmCollaborator,
                idClinic: readPatientResult.idSmClinic
            }
        }
        return response
    }
}