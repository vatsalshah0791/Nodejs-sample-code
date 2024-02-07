'use strict'


import SmPatientDentalTreatment from '../entities/SmPatientDentalTreatment'


interface TreatmentInterface {
    dentalPiece: SmPatientDentalTreatment['dentalPiece']
    price: SmPatientDentalTreatment['price']
    idSmDentalTreatment: SmPatientDentalTreatment['idSmDentalTreatment']
}
export interface CreatePatientDentalTreatmentInterface {
    discount: SmPatientDentalTreatment['discount']
    isDraft: SmPatientDentalTreatment['isDraft']
    idSmPatient: SmPatientDentalTreatment['idSmPatient']
    treatments: TreatmentInterface[]
}