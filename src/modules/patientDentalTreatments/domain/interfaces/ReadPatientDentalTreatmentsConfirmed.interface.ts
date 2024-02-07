'use strict'


import SmPatientDentalTreatment from '../entities/SmPatientDentalTreatment'


export interface ReadPatientDentalTreatmentsConfirmedInterface {
    idPatient: string
}

export interface ReadPatientDentalTreatmentsConfirmedResultInterface {
    id: SmPatientDentalTreatment['id']
    treatmentName: string
    dentalPiece: SmPatientDentalTreatment['dentalPiece']
    currencySymbol: string
    price: SmPatientDentalTreatment['price']
    discount: SmPatientDentalTreatment['discount']
    total: SmPatientDentalTreatment['total']
    totalPagado: number
    status: SmPatientDentalTreatment['status']
    createdAt: SmPatientDentalTreatment['createdAt']
    updatedAt: SmPatientDentalTreatment['updatedAt']
}