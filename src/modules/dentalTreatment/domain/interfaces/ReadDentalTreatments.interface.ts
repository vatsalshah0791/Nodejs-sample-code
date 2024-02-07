'use strict'


import SmDentalTreatment from '../entities/SmDentalTreatment'


export interface ReadDentalTreatmentsInterface {
    idClinic: string
}

export interface ReadDentalTreatmentsResultInterface {
    id: SmDentalTreatment['id']
    treatmentName: SmDentalTreatment['treatmentName']
    price: SmDentalTreatment['price']
    currency: string
}