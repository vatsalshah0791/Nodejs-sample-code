'use strict'


import SmDentalTreatment from '../entities/SmDentalTreatment'


export interface CreateDentalTreatmentInterface {
    treatmentName: SmDentalTreatment['treatmentName']
    price: SmDentalTreatment['price']
    idSmClinic: SmDentalTreatment['idSmClinic']
}

export interface CreateDentalTreatmentResultInterface {
    success: boolean
    id?: SmDentalTreatment['id']
}