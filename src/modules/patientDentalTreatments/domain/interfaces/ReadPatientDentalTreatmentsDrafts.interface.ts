'use strict'


import SmPatientDentalTreatment from '../entities/SmPatientDentalTreatment'


export interface ReadPatientDentalTreatmentsDraftsInterface {
    idPatient: string
}

export interface ReadPatientDentalTreatmentsDraftsResultInterface {
    id: SmPatientDentalTreatment['id']
    treatmentName: string
    dentalPiece: SmPatientDentalTreatment['dentalPiece']
    currencySymbol: string
    price: SmPatientDentalTreatment['price']
    discount: SmPatientDentalTreatment['discount']
    total: SmPatientDentalTreatment['total']
    createdAt: SmPatientDentalTreatment['createdAt']
    updatedAt: SmPatientDentalTreatment['updatedAt']
}