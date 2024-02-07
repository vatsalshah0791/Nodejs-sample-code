'use strict'


import SmDentalTreatment from '../entities/SmDentalTreatment'


export interface UpdateDentalTreatmentInterface {
    treatmentName: SmDentalTreatment['treatmentName']
    price: SmDentalTreatment['price']
    id: SmDentalTreatment['id']
}