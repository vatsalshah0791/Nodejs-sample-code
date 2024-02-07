'use strict'


import SmPatient from '../entities/SmPatient'


export interface UpdatePatientInterface {
    id: SmPatient['id']
    firstName: string
    lastName: string
    email: SmPatient['email']
    phonePrefix: SmPatient['phonePrefix']
    phone: SmPatient['phone']
    fullAddress: SmPatient['fullAddress']
    workplace: SmPatient['workplace']
    recommendedBy: SmPatient['recommendedBy']
    birthDate: SmPatient['birthDate']
    emergencyPhonePrefix?: SmPatient['emergencyPhonePrefix']
    emergencyPhone: SmPatient['emergencyPhone']
    emergencyName: SmPatient['emergencyName']
    idAppGender: SmPatient['idAppGender']
    idAppCountry: SmPatient['idAppCountry']
    idSmCollaborator: SmPatient['idSmCollaborator']
}